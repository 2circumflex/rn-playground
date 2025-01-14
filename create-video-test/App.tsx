import React from "react";
import { View, Button, Image, StyleSheet } from "react-native";
import { FFmpegKit, ReturnCode } from "ffmpeg-kit-react-native";
import * as RNFS from "@dr.pogodin/react-native-fs";

const App = () => {
  const createVideo = async () => {
    try {
      const image1Path = require("./assets/bonobono1.png");
      const image2Path = require("./assets/bonobono2.png");
      const resolvedPath1 = Image.resolveAssetSource(image1Path).uri;
      const resolvedPath2 = Image.resolveAssetSource(image2Path).uri;

      const tempOutputPath = `${RNFS.DocumentDirectoryPath}/temp.mp4`;
      const finalOutputPath = `${RNFS.DocumentDirectoryPath}/output.mp4`;

      // 1단계: 0.6초짜리 기본 영상 생성
      const command1 = `-y -loop 1 -t 0.3 -i "${resolvedPath1}" -loop 1 -t 0.3 -i "${resolvedPath2}" -filter_complex "[0][1]concat=n=2:v=1:a=0" "${tempOutputPath}"`;

      // 첫 번째 영상 생성
      const session1 = await FFmpegKit.execute(command1);
      const returnCode1 = await session1.getReturnCode();

      if (!ReturnCode.isSuccess(returnCode1)) {
        const logs = await session1.getLogsAsString();
        throw new Error(`First stage failed: ${logs}`);
      }

      // 2단계: 생성된 영상을 10번 반복
      const command2 = `-y -stream_loop 15 -i "${tempOutputPath}" -c copy "${finalOutputPath}"`;

      const session2 = await FFmpegKit.execute(command2);
      const returnCode2 = await session2.getReturnCode();

      if (ReturnCode.isSuccess(returnCode2)) {
        console.log("성공! 저장된 경로:", finalOutputPath);
        // 임시 파일 삭제
        await RNFS.unlink(tempOutputPath);
      } else {
        const logs = await session2.getLogsAsString();
        console.error("실패:", logs);
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="보노보노 애니메이션 만들기"
        onPress={createVideo}
        accessibilityLabel="보노보노 애니메이션 생성 버튼"
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
