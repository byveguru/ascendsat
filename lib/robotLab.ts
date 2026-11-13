export type Heading = "N" | "E" | "S" | "W";
export type RobotCommand = "MOVE_FORWARD" | "ROTATE_LEFT" | "ROTATE_RIGHT";
export type RobotState = { x: number; y: number; heading: Heading; halted: boolean };
export type RobotGrid = { width: number; height: number; blocked: number[][] };
export const ROBOT_COMMANDS: RobotCommand[] = ["MOVE_FORWARD", "ROTATE_LEFT", "ROTATE_RIGHT"];
const headings: Heading[] = ["N", "E", "S", "W"];
export function canRobotMove(grid: RobotGrid, state: RobotState, direction = "forward") {
  const offset = ({ forward: 0, right: 1, backward: 2, left: 3 } as Record<string, number>)[direction];
  if (offset === undefined) return false;
  const heading = (headings.indexOf(state.heading) + offset) % 4;
  const x = state.x + [0, 1, 0, -1][heading], y = state.y + [1, 0, -1, 0][heading];
  return x >= 1 && x <= grid.width && y >= 1 && y <= grid.height && !grid.blocked.some(cell => cell[0] === x && cell[1] === y);
}
export function stepRobot(grid: RobotGrid, state: RobotState, command: RobotCommand): RobotState {
  if (state.halted) return state;
  const heading = headings.indexOf(state.heading);
  if (command === "ROTATE_LEFT") return { ...state, heading: headings[(heading + 3) % 4] };
  if (command === "ROTATE_RIGHT") return { ...state, heading: headings[(heading + 1) % 4] };
  // AP reference behavior: a blocked move leaves position unchanged and halts.
  if (!canRobotMove(grid, state)) return { ...state, halted: true };
  return { ...state, x: state.x + [0, 1, 0, -1][heading], y: state.y + [1, 0, -1, 0][heading] };
}
export function traceRobot(grid: RobotGrid, start: Omit<RobotState, "halted">, commands: RobotCommand[], limit = commands.length) {
  let state: RobotState = { ...start, halted: false };
  const trace = [{ command: "START", state }];
  for (const command of commands.slice(0, limit)) {
    state = stepRobot(grid, state, command); trace.push({ command, state });
    if (state.halted) break;
  }
  return trace;
}
