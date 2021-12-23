/**
 * @Desc: popper
 * @Author: wu xingtao
 * @Date: 2021/6/7
 */
import { Transition, vShow, withCtx, withDirectives,h } from "vue";
import { NOOP } from '@vue/shared'
import { stop } from "@x-ui/utils/dom";

import type { Ref, VNode,CSSProperties } from "vue";
import type {Effect} from "@x-ui/popper/src/use-popper/defaults";

interface IRenderPopperProps {
  effect: Effect
  name: string
  stopPopperMouseEvent: boolean,
  popperClass: string
  popperStyle?: Partial<CSSProperties>
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
    effect,name, stopPopperMouseEvent, popperClass, popperStyle, popperRef, pure, popperId, visibility,
    onMouseenter, onMouseleave, onAfterEnter, onAfterLeave, onBeforeEnter, onBeforeLeave
  } = props;
  const classes = [
    popperClass,
    "x-popper",
    // 'is-' + effect,
    pure ? "is-pure" : ""
  ];

  const kls = [popperClass, 'x-popper', `is-${effect}`, pure ? 'is-pure' : '']

  const mouseUpAndDown = stopPopperMouseEvent ? stop : NOOP;

  return h(
    Transition,
    {
      name,
      "onAfterEnter": onAfterEnter,
      "onAfterLeave": onAfterLeave,
      "onBeforeEnter": onBeforeEnter,
      "onBeforeLeave": onBeforeLeave
    },
    {
      default: withCtx(() => [
        withDirectives(
          h(
            'div',
            {
              'aria-hidden': String(!visibility),
              class: kls,
              style: popperStyle ?? {},
              id: popperId,
              ref: popperRef ?? 'popperRef',
              role: 'tooltip',
              onMouseenter,
              onMouseleave,
              onClick: stop,
              onMousedown: mouseUpAndDown,
              onMouseup: mouseUpAndDown,
            },
            children
          ),
          [[vShow, visibility]]
        ),
      ]),
    }
  );
}
