self.addEventListener('message', async (event: MessageEvent) => {
  const { label, data, aaa } = event.data;

  try {
    switch (label) {
      case 'test1': {
        // 发送当前时间
        const time = new Date();
        console.log('worker',aaa, time - data);
        break;
      }
      // 可以添加其他 case
      default:
        throw new Error(`Unhandled message label: ${label}`);
    }
  } catch (error) {
    console.log(error);
  }
});
