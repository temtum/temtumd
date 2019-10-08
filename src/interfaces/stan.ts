interface StanOptions {
  servers: string[];
  reconnect: boolean;
  maxReconnectAttempts: number;
  waitOnFirstConnect: boolean;
  reconnectTimeWait: number;
  stanPingInterval: number;
  user?: string;
  pass?: string;
}

export { StanOptions };
