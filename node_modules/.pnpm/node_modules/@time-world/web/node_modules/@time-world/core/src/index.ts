// ==============================
// Time World · Core Engine (MVP)
// ==============================

// ---- 输入结构：一次时间记录 ----
export type TimeRecord = {
  intent: number;   // 主观意图强度 0~1
  time: number;     // 投入时间（分钟）
  action: number;   // 行动匹配度 0~1
  emotion: number;  // 情绪体验 0~1（越低越糟）
  energy: number;   // 精力消耗 / 状态 0~1
};

// ---- 输出结构：世界地块 ----
export type WorldTile = {
  elevation: number; // 地势高度 0~1
  fertility: number; // 繁荣度 / 成长性 0~1
  stability: number; // 稳定度 0~1
};

// ---- 工具函数：安全数值 ----
function clamp01(v: number): number {
  if (!Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

// ---- 世界生成规则（MVP 版） ----
export function generateTile(record: TimeRecord): WorldTile {
  const intent = clamp01(record.intent);
  const action = clamp01(record.action);
  const emotion = clamp01(record.emotion);
  const energy = clamp01(record.energy);

  // 时间归一化：假设 240 分钟为上限
  const timeFactor = clamp01(record.time / 240);

  /**
   * 地势（Elevation）
   * 高意图 + 高行动 + 高时间 = 抬升
   * 能量不足会压低地势
   */
  const elevation = clamp01(
    intent * action * timeFactor * (0.5 + energy * 0.5)
  );

  /**
   * 繁荣度（Fertility）
   * 情绪体验 + 能量决定“是否值得继续”
   */
  const fertility = clamp01(
    emotion * 0.6 + energy * 0.4
  );

  /**
   * 稳定度（Stability）
   * 行动是否匹配意图 + 情绪是否稳定
   */
  const stability = clamp01(
    (intent * action + emotion) / 2
  );

  return {
    elevation,
    fertility,
    stability,
  };
}
