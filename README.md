# SIH2023-PixelEncoders
We have conducted extensive testing on the following models with various non linear filters to imporove the performance and results of dehazing:\
Models tested:\
MixDehazeNet\
GrdiDehazeNet\
SFNet\
DehazeFormer\
RIDCP_Dehazing\
DRSFormer


Non Linear Functions Tested:\
Wiener Filter


Proposed Solution 1
<img width="100%" src="https://github.com/agntgalahad/SIH2023-PixelEncoders/blob/main/GridDehazeNet/indoor_results/Screenshot%20from%202023-09-24%2012-51-17.png">

Future Scope of Model:

To test out chnages in the attention mechanism used in the above model to improve performance\
To use:\
Sparse Attention\
Window Attention (from DehazeFromer)


Proposed Solution 2: \
YOLO V5 model added at the end to perform human detection to aid in search operations\
Addition of Sparse Attention in MixDeHazeNet architecture in to reduce latency (training still in progress)\
Addition of wiener filter and Dark Channel Prior for reducing latency
<img width="100%" src="https://github.com/agntgalahad/SIH2023-PixelEncoders/blob/main/MixedDehazeNet/results/Screenshot%20from%202023-09-24%2012-53-33.png">
