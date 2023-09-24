import os 
import cv2
import torch
import torch.nn as nn
import torch.nn.functional as F
from collections import OrderedDict
from models import *
from datasets.loader import SingleLoader, LiveLoader
from utils import hwc_to_chw, chw_to_hwc
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--source', default= 0, type=int, help='feed source')
parser.add_argument('--file_path', default=None, type=str, help='video file path')
parser.add_argument('--result_path', default='./results', type=str, help='result path')
parser.add_argument('--yolo', default=False, type=bool, help='use yolo or not')
args = parser.parse_args()


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("DEVICE USED: " + str(device))
if args.file_path != None:
    cap = cv2.VideoCapture(args.file_path)
    filename = sorted(os.listdir(args.result_path))[-1]
    filename = filename.split('.')[0]
    filename = filename + str(len(os.listdir(args.result_path)) + 1) + '.amp4'
    result_path = args.result_path + '/' + filename
    print('video found')
    result = cv2.VideoWriter(result_path, 
                         -1,
                         10.0, (640,480))

else:
    cap = cv2.VideoCapture(0)
NAME = 'MixDehazeNet_b'



def single(save_dir):
	state_dict = torch.load(save_dir)['state_dict']
	new_state_dict = OrderedDict()

	for k, v in state_dict.items():
		name = k[7:]
		new_state_dict[name] = v

	return new_state_dict

def load_model(model_name, saved_model_dir):
    network = eval(model_name)()
    network.cuda()

    if os.path.exists(saved_model_dir):
        print('==> Start testing, current model name: ' + NAME)
        network.load_state_dict(single(saved_model_dir))
        return network
    else:
        print('==> No model found, please check the path')
        return None

def frame_transform(frame):
    frame = frame / 255. * 2 - 1
    frame = torch.from_numpy(frame).float()
    frame = frame.unsqueeze(0)
    frame = frame.permute(0, 3, 1, 2)
    frame = frame.to(device)
    return frame

def main():
    network = load_model(model_name=NAME, saved_model_dir='./saved_models/indoor/MixDehazeNet_b.pth')

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        # cv2.imshow("frame", frame)
        cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame = frame_transform(frame)

        with torch.no_grad():
            output = network(frame).clamp(-1, 1)
            output = output * 0.5 + 0.5		# [-1, 1] to [0, 1]

        out_img = chw_to_hwc(output.detach().cpu().squeeze(0).numpy())
        # cv2.imshow("out_img", out_img)
        if args.file_path != None:
            result.write(out_img)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    result.release()
    if args.yolo:
        filename = filename.split('.')[0] + 'yolo' + '.'
        os.system('python3 ../yolov5/detect.py --classes 0 --name ./results/'+ filename +' --source ' + result_path)

main()