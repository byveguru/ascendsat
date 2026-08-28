// @ts-nocheck
import React, { useMemo } from "react";
import { Platform } from "react-native";
import {
  Activity,
  Book,
  BookOpen,
  ClipboardList,
  FileText,
  Home,
  LayoutGrid,
  Map,
  MapPin,
  Pencil,
  Percent,
  Search,
  Settings,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "./dock";
import { TOOL_LABELS } from "../../lib/dockItems";

const ICONS = {
  home: Home,
  practice: Pencil,
  smartQuiz: Zap,
  fullTest: ClipboardList,
  review: Search,
  growth: TrendingUp,
  drills: Target,
  lessons: BookOpen,
  games: LayoutGrid,
  vocab: Book,
  desmosLessons: Percent,
  cramsheets: FileText,
  studyPlan: Map,
  weakAreas: MapPin,
  diagnostic: Activity,
  settings: Settings,
};

export default function AscendDock({
  toolIds = [],
  isLight = false,
  isItemActive = () => false,
  onItemPress = () => {},
  hidden = false,
}) {
  const items = useMemo(
    () =>
      toolIds.map((toolId) => ({
        toolId,
        label: TOOL_LABELS[toolId] || toolId,
        Icon: ICONS[toolId] || Target,
      })),
    [toolIds]
  );

  if (Platform.OS !== "web" || hidden || items.length === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: "calc(100% - 48px)",
        zIndex: 80,
        pointerEvents: "auto",
      }}
    >
      <Dock isLight={isLight} className="items-end pb-3">
        {items.map((item) => {
          const Icon = item.Icon;
          const active = isItemActive(item.toolId);
          return (
            <DockItem
              key={item.toolId}
              isLight={isLight}
              isActive={active}
              onClick={() => onItemPress(item.toolId)}
            >
              <DockLabel>{item.label}</DockLabel>
              <DockIcon>
                <Icon style={{ width: "100%", height: "100%" }} strokeWidth={active ? 2.25 : 2} />
              </DockIcon>
            </DockItem>
          );
        })}
      </Dock>
    </div>
  );
}
