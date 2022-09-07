type EventHandler<T extends []> = (...args: T) => void;

export interface Bus {
    on: (event: string, callback: () => void) => void;
    off: (event: string, callback: () => void) => void;
    emit: <T extends []>(event: string, ...args: T) => void;
}

export class EventBus implements Bus {
  private readonly listeners: Record<string, Array<EventHandler<any>>> = {};

  on(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit<T extends []>(event: string, ...args: T) {
    if (!this.listeners[event]) {
      throw new Event(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
