"use client";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface Props {
  items: any[];
  onReorder: (newItems: any[]) => void;
  renderItem: (item: any, index: number) => JSX.Element;
}

/**
 * A reusable reorderable list using @dnd-kit
 * Fully supports nested drag contexts (e.g., summary + responsibilities)
 */
export function ReorderableList({ items, onReorder, renderItem }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = parseInt(active.id);
    const newIndex = parseInt(over.id);
    onReorder(arrayMove(items, oldIndex, newIndex));
  };

  // ✅ Separate DndContext for every ReorderableList instance
  // ensures Responsibilities lists work independently
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((_, i) => i.toString())}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item, i) => (
          <SortableItem key={i} id={i.toString()}>
            {renderItem(item, i)}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none", // fixes nested drag interference
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    const target = event.target as HTMLElement;
    // prevent dragging when clicking delete buttons etc.
    if (target.closest("[data-no-drag]")) {
      event.stopPropagation();
      return;
    }
    listeners.onPointerDown?.(event);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      onPointerDown={handlePointerDown}
      className="cursor-grab active:cursor-grabbing select-none"
    >
      {children}
    </div>
  );
}
