import { RequestWorkerLabelsEnum } from '../upload.helper.class';

self.addEventListener('message', async (event: MessageEvent) => {
  const {
    label,
    data,
    index,
  }: { label: RequestWorkerLabelsEnum; data: ArrayBuffer[]; index: number } = event.data;

  try {
    switch (label) {
      case RequestWorkerLabelsEnum.DOING: {
        console.log(label, data, index);

        postMessage({
          label: RequestWorkerLabelsEnum.DONE,
          data: 6666, // 发送错误信息字符串
          index,
        });
        break;
      }
      // 可以添加其他 case
      default:
        throw new Error(`Unhandled message label: ${label}`);
    }
  } catch (error) {
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = `${error.message}\n${error.stack}`;
    } else {
      errorMessage = String(error);
    }
    postMessage({
      label: RequestWorkerLabelsEnum.ERROR,
      data: errorMessage, // 发送错误信息字符串
      index,
    });
  }
});
