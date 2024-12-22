import { FFmpegKit, ReturnCode } from "ffmpeg-kit-react-native";
import * as FileSystem from 'expo-file-system';
import { useMutation } from "@tanstack/react-query";

const useVideoCrop = () => {
    return useMutation({
        mutationFn: async ({ uri, start, end }) => {
            const output = `${FileSystem.cacheDirectory}cropped_video_${Date.now()}.mp4`;

            const command = `-i "${uri}" -ss ${start} -to ${end} -c:v copy -c:a copy "${output}"`;

            const result = await FFmpegKit.execute(command);
            const returnCode = await result.getReturnCode();

            if (ReturnCode.isSuccess(returnCode)) {
                console.log("Cropping successful:", output);
                return output;
            } else {
                const logs = await result.getAllLogs();
                console.error("FFmpeg Error Logs:", logs);
                throw new Error("FFmpeg error: Unknown error");
            }
        },
    });
};

export default useVideoCrop;