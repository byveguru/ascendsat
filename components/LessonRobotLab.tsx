import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { G, Path, Rect, Text as SvgText } from "react-native-svg";
import { ascentTheme, fonts } from "../theme";
import { makeLessonVisualStyles, makeLessonSortStyles } from "../appStyles";
import { useLessonSandbox } from "../lib/useLessonSandbox";
import { canRobotMove, ROBOT_COMMANDS, traceRobot, type RobotCommand } from "../lib/robotLab";

type Draft = { program: RobotCommand[]; pc: number };
export default function LessonRobotLab({ block, isLight = true, scopeKey, renderCoach, hideTitle = false }: any) {
  const s = makeLessonVisualStyles(isLight), sort = makeLessonSortStyles(isLight), t = ascentTheme(isLight);
  const initial: Draft = { program: block.commands || [], pc: 0 };
  const { state: draft, setState, ready, notice } = useLessonSandbox<Draft>(scopeKey, `${block.id}:${JSON.stringify([block.grid,block.start,block.goal])}`, initial, (value: any): value is Draft => !!value && Array.isArray(value.program) && value.program.length <= 16 && value.program.every((command: any) => ROBOT_COMMANDS.includes(command)) && Number.isInteger(value.pc) && value.pc >= 0 && value.pc <= value.program.length);
  const [probe, setProbe] = useState("");
  const trace = traceRobot(block.grid, block.start, draft.program, draft.pc);
  const robot = trace[trace.length - 1].state;
  const atGoal = robot.x === block.goal.x && robot.y === block.goal.y && !robot.halted;
  const cell = 44, left = 32, top = 18;
  const X = (x: number) => left + (x - 1) * cell, Y = (y: number) => top + (block.grid.height - y) * cell;
  const action = (label: string, onPress: () => void, disabled = false) => <TouchableOpacity key={label} accessibilityRole="button" disabled={!ready || disabled} onPress={onPress} style={[s.control, (!ready || disabled) && sort.disabled]}><Text style={s.controlText}>{label}</Text></TouchableOpacity>;
  return <View style={s.section}>
    {!hideTitle && <Text accessibilityRole="header" style={s.title}>{block.title}</Text>}<Text style={s.body}>{block.prompt}</Text>
    <Svg accessibilityRole="image" accessibilityLabel={`Robot at (${robot.x}, ${robot.y}), facing ${robot.heading}. Goal (${block.goal.x}, ${block.goal.y}). Blocked cells: ${block.grid.blocked.map((p: number[]) => `(${p[0]}, ${p[1]})`).join(", ")}. Coordinates increase right and up.`} width="100%" height={250} viewBox={`0 0 ${left + cell * block.grid.width + 18} ${top + cell * block.grid.height + 30}`}>
      {Array.from({ length: block.grid.height }, (_, j) => j + 1).flatMap(y => Array.from({ length: block.grid.width }, (_, i) => i + 1).map(x => {
        const blocked = block.grid.blocked.some((p: number[]) => p[0] === x && p[1] === y), goal = x === block.goal.x && y === block.goal.y;
        return <G key={`${x}-${y}`}><Rect x={X(x)} y={Y(y)} width={cell} height={cell} fill={blocked ? t.muted : goal ? t.soft : t.surface} stroke={t.border} />{goal && <SvgText fontFamily={fonts.text} x={X(x) + cell / 2} y={Y(y) + cell / 2 + 4} fontSize={10} fill={t.forest} textAnchor="middle">Goal</SvgText>}{blocked && <Path d={`M ${X(x) + 14} ${Y(y) + 14} l 16 16 m 0 -16 l -16 16`} stroke={t.surface} strokeWidth={2} />}</G>;
      }))}
      {Array.from({ length: block.grid.width }, (_, i) => i + 1).map(x => <SvgText fontFamily={fonts.text} key={x} x={X(x) + cell / 2} y={top + cell * block.grid.height + 19} textAnchor="middle" fontSize={11} fill={t.text}>{x}</SvgText>)}
      {Array.from({ length: block.grid.height }, (_, i) => i + 1).map(y => <SvgText fontFamily={fonts.text} key={y} x={left - 12} y={Y(y) + cell / 2 + 4} textAnchor="middle" fontSize={11} fill={t.text}>{y}</SvgText>)}
      <G transform={`rotate(${["N", "E", "S", "W"].indexOf(robot.heading) * 90}, ${X(robot.x) + cell / 2}, ${Y(robot.y) + cell / 2})`}><Path d={`M ${X(robot.x) + 22} ${Y(robot.y) + 8} L ${X(robot.x) + 35} ${Y(robot.y) + 34} L ${X(robot.x) + 9} ${Y(robot.y) + 34} Z`} fill={t.terracotta} stroke={t.ink} strokeWidth={1} /></G>
    </Svg>
    <Text accessibilityLiveRegion="polite" style={robot.halted ? sort.incorrectLabel : s.body}>{robot.halted ? "Program stopped: that move is blocked. The robot stayed in place." : `Position (${robot.x}, ${robot.y}) · facing ${robot.heading}${atGoal ? " · Target reached at this step" : ""}`}</Text>
    <Text style={s.note}>Turning changes direction, not position. A blocked forward move stops the program. Reset the robot before trying again.</Text>
    <Text style={s.figureTitle}>Your program · {draft.program.length} of 16 commands</Text>
    {draft.program.map((command, i) => <Text key={i} style={[s.body, i === draft.pc && { fontWeight: "700", color: t.forest }]}>{i + 1}. {command}(){i < trace.length - 1 ? " · ran" : i === draft.pc && !robot.halted ? " · next" : ""}</Text>)}
    <View style={s.controls}>{ROBOT_COMMANDS.map(command => action(`Add ${command}`, () => { setState(previous => ({ program: [...previous.program, command], pc: 0 })); setProbe(""); }, draft.pc > 0 || draft.program.length >= 16))}{action("Remove last", () => setState(previous => ({ program: previous.program.slice(0, -1), pc: 0 })), draft.pc > 0 || !draft.program.length)}</View>
    <View style={s.controls}>{action("Run next command", () => { setState(previous => ({ ...previous, pc: previous.pc + 1 })); setProbe(""); }, robot.halted || draft.pc >= draft.program.length)}{action("Run program", () => { const full = traceRobot(block.grid, block.start, draft.program); setState(previous => ({ ...previous, pc: full.length - 1 })); setProbe(""); }, robot.halted || !draft.program.length || draft.pc >= draft.program.length)}{action("Reset robot", () => { setState(previous => ({ ...previous, pc: 0 })); setProbe(""); })}{action("Clear program", () => { setState({ program: [], pc: 0 }); setProbe(""); })}{action("Load example", () => { setState({ program: block.commands || [], pc: 0 }); setProbe(""); })}</View>
    <Text style={[s.figureTitle, { marginTop: 20 }]}>Probe a direction without moving</Text>
    <View style={s.controls}>{["left", "right", "forward", "backward"].map(direction => action(`CAN_MOVE(${direction})`, () => setProbe(`CAN_MOVE(${direction}) = ${canRobotMove(block.grid, robot, direction) ? "true" : "false"}. Position and heading have not changed.`), robot.halted))}</View>
    {!!probe && <Text accessibilityLiveRegion="polite" style={s.body}>{probe}</Text>}
    {renderCoach?.(robot.halted ? "encouraging" : atGoal ? "proud" : "focused", robot.halted ? "Use CAN_MOVE to check the square before you try a forward move." : "Predict the next position and heading, then run one command to check.")}
    {!!notice && <Text style={s.note}>{notice}</Text>}
  </View>;
}
