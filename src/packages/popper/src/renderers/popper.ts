/**
 * @Desc: popper
 * @Author: wu xingtao
 * @Date: 2021/6/7
 */
import { createVNode, Transition, vShow, withCtx, withDirectives } from "vue";
import { NOOP } from '@vue/shared'
import {PatchFlags} from "@x-ui/utils/vnode";
import { stop } from "@x-ui/utils/dom";

import type { Ref, VNode } from "vue";
import type {Effect} from "@x-ui/popper/src/use-popper/defaults";

interface IRenderPopperProps {
  effect: Effect
  name: string
  stopPopperMouseEvent: boolean,
  popperClass: string
  popperStyle?: Partial<CSSStyleDeclaration>
  popperId: string
  popperRef?: Ref<HTMLElement>
  pure?: boolean
  visibility: boolean,
  onMouseenter: () => void
  onMouseleave: () => void
  onAfterEnter?: () => void
  onAfterLeave?: () => void
  onBeforeEnter?: () => void
  onBeforeLeave?: () => void
}

export default function renderPopper(props: IRenderPopperProps, children: VNode[]) {
  const {
    name, stopPopperMouseEvent, popperClass, popperStyle, popperRef, pure, popperId, visibility,
    onMouseenter, onMouseleave, onAfterEnter, onAfterLeave, onBeforeEnter, onBeforeLeave
  } = props;
  const classes = [
    popperClass,
    "x-popper",
    // 'is-' + effect,
    pure ? "is-pure" : ""
  ];

  const mouseUpAndDown = stopPopperMouseEvent ? stop : NOOP;

  return createVNode(
    Transition,
    {
      name,
      "onAfterEnter": onAfterEnter,
      "onAfterLeave": onAfterLeave,
      "onBeforeEnter": onBeforeEnter,
      "onBeforeLeave": onBeforeLeave
    },
    {
      default: withCtx(() => [withDirectives(
        createVNode(
          "div",
          {
            "aria-hidden": String(!visibility),
            class: classes,
            style: popperStyle ?? {},
            id: popperId,
            ref: popperRef ?? "popperRef",
            role: "tooltip",
            onMouseenter,
            onMouseleave,
            onClick: stop,
            onMousedown: mouseUpAndDown,
            onMouseup: mouseUpAndDown
          },
          children,
          PatchFlags.CLASS | PatchFlags.STYLE | PatchFlags.PROPS | PatchFlags.HYDRATE_EVENTS,
          [
            'aria-hidden',
            'onMouseenter',
            'onMouseleave',
            'onMousedown',
            'onMouseup',
            'onClick',
            'id',
          ]
        ),
        [[vShow, visibility]]
      )])
    },
    PatchFlags.PROPS, ['name', 'onAfterEnter', 'onAfterLeave', 'onBeforeEnter', 'onBeforeLeave'],
  );
}
