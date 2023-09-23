import os 
import cv2
import torch
import torch.nn as nn
import torch.nn.functional as F
from collections import OrderedDict
from models import *
from datasets.loader import SingleLoader, LiveLoader
from utils import hwc_to_chw, chw_to_hwc

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("DEVICE USED: " + str(device))
cap = cv2.VideoCapture(0)

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
        print('==> Start testing, current model name: ' + 'MixDehazeNet_b')
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
    network = load_model(model_name='MixDehazeNet_b', saved_model_dir='./saved_models/indoor/MixDehazeNet_b.pth')

    while True:
        ret, frame = cap.read()
        cv2.imshow("frame", frame)
        cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame = frame_transform(frame)

        with torch.no_grad():
            output = network(frame).clamp_(-1, 1)
            output = output * 0.5 + 0.5		# [-1, 1] to [0, 1]

        out_img = chw_to_hwc(output.detach().cpu().squeeze(0).numpy())
        cv2.imshow("out_img", out_img)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

main()