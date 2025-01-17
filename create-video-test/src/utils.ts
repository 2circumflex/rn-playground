import { Image } from "react-native";
import { FFmpegKit, ReturnCode } from "ffmpeg-kit-react-native";
import * as FileSystem from "expo-file-system";

export const createVideo = async (): Promise<string | undefined> => {
  try {
    const image1Path = require("../assets/bonobono1.png");
    const image2Path = require("../assets/bonobono2.png");
    const watermarkPath = require("../assets/watermark.png");
    const resolvedPath1 = Image.resolveAssetSource(image1Path).uri;
    const resolvedPath2 = Image.resolveAssetSource(image2Path).uri;
    const resolvedWatermarkPath = Image.resolveAssetSource(watermarkPath).uri;

    const tempOutputPath = `${FileSystem.documentDirectory}/temp.mp4`;
    const finalOutputPath = `${FileSystem.documentDirectory}/output.mp4`;

    // 1. 입력 파일과 기본 옵션 설정
    // -y: 기존 파일 덮어쓰기
    // -loop 1: 이미지를 0.3초 동안 반복 재생 (정지 이미지가 아닌 영상처럼 처리)
    // -t 0.3: 각 이미지의 총 재생 시간을 0.3초로 제한
    // -i: 입력 파일 지정
    let command1 = `-y -loop 1 -t 0.3 -i "${resolvedPath1}" -loop 1 -t 0.3 -i "${resolvedPath2}"`;

    // 2. 워터마크 이미지 입력 추가
    // -i: 세 번째 입력 파일(워터마크) 지정
    command1 += ` -i "${resolvedWatermarkPath}"`;

    // 3. 필터 복합 명령어 설정
    // [0][1]: 첫 번째와 두 번째 입력 스트림 참조
    // concat=n=2:v=1:a=0: 두 개의 비디오를 연결 (오디오 없음)
    // [base]: 연결된 결과를 'base'로 이름 지정
    // [base][2]: base와 워터마크(세 번째 입력) 참조
    // overlay: 워터마크 오버레이 적용
    command1 += ` -filter_complex "[0][1]concat=n=2:v=1:a=0[base];[base][2]overlay=x=10:y=10"`;

    // 4. 출력 파일 경로 지정
    // 마지막에 출력 파일 경로를 지정해야 함
    command1 += ` "${tempOutputPath}"`;

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
      await FileSystem.deleteAsync(tempOutputPath);
      return finalOutputPath;
    } else {
      const logs = await session2.getLogsAsString();
      console.error("실패:", logs);
    }
  } catch (error) {
    console.error("에러 발생:", error);
  }
};
