import shutil
import os
import sys
import uuid

def copy_video(input_path, output_folder):
    try:
        # Generate a unique output filename
        output_filename = "result.mp4"
        
        # Combine the output folder and filename to create the output path
        output_path = os.path.join(output_folder, output_filename)
        
        # Copy the input video to the output path
        shutil.copyfile(input_path, output_path)
        
        print(f"Video copied to {output_path}")
    except Exception as e:
        print(f"Error copying video: {str(e)}")


# Get the input video file path from the user
input_video_path = "./local_videos/test.mp4"

# Check if the input file exists
if not os.path.isfile(input_video_path):
    print("Input file does not exist.")
    sys.exit(1)


# Call the copy_video function to copy the video
copy_video(input_video_path, "./results")


