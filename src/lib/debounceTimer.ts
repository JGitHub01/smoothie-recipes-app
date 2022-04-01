let timer: NodeJS.Timeout;
export function debounceTimer(callback: () => void, timeout: number) {
  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    callback();
  }, timeout);
}
