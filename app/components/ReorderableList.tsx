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

export function ReorderableList({ items, onReorder, renderItem }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // must move 5px before starting drag
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = parseInt(active.id);
      const newIndex = parseInt(over.id);
      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    // Allow clicks on X buttons or other non-draggable elements
    if ((event.target as HTMLElement).closest("[data-no-drag]")) {
      event.stopPropagation(); // prevent drag start
      return;
    }

    // Otherwise, let drag events go through normally
    if (listeners.onPointerDown) {
      listeners.onPointerDown(event);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
    >
      {children}
    </div>
  );
}
