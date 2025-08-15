module.exports = {

"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "filterProps": ()=>filterProps,
    "loadExternalIsValidProp": ()=>loadExternalIsValidProp
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs [app-ssr] (ecmascript)");
;
let shouldForward = (key)=>!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidMotionProp"])(key);
function loadExternalIsValidProp(isValidProp) {
    if (typeof isValidProp !== "function") return;
    // Explicitly filter our events
    shouldForward = (key)=>key.startsWith("on") ? !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidMotionProp"])(key) : isValidProp(key);
}
/**
 * Emotion and Styled Components both allow users to pass through arbitrary props to their components
 * to dynamically generate CSS. They both use the `@emotion/is-prop-valid` package to determine which
 * of these should be passed to the underlying DOM node.
 *
 * However, when styling a Motion component `styled(motion.div)`, both packages pass through *all* props
 * as it's seen as an arbitrary component rather than a DOM node. Motion only allows arbitrary props
 * passed through the `custom` prop so it doesn't *need* the payload or computational overhead of
 * `@emotion/is-prop-valid`, however to fix this problem we need to use it.
 *
 * By making it an optionalDependency we can offer this functionality only in the situations where it's
 * actually required.
 */ try {
    /**
     * We attempt to import this package but require won't be defined in esm environments, in that case
     * isPropValid will have to be provided via `MotionContext`. In a 6.0.0 this should probably be removed
     * in favour of explicit injection.
     */ loadExternalIsValidProp(__turbopack_context__.r("[project]/node_modules/.pnpm/@emotion+is-prop-valid@1.3.1/node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js [app-ssr] (ecmascript)").default);
} catch  {
// We don't need to actually do anything here - the fallback is the existing `isPropValid`.
}
function filterProps(props, isDom, forwardMotionProps) {
    const filteredProps = {};
    for(const key in props){
        /**
         * values is considered a valid prop by Emotion, so if it's present
         * this will be rendered out to the DOM unless explicitly filtered.
         *
         * We check the type as it could be used with the `feColorMatrix`
         * element, which we support.
         */ if (key === "values" && typeof props.values === "object") continue;
        if (shouldForward(key) || forwardMotionProps === true && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidMotionProp"])(key) || !isDom && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidMotionProp"])(key) || props["draggable"] && key.startsWith("onDrag")) {
            filteredProps[key] = props[key];
        }
    }
    return filteredProps;
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * Decides if the supplied variable is variant label
 */ __turbopack_context__.s({
    "isVariantLabel": ()=>isVariantLabel
});
function isVariantLabel(v) {
    return typeof v === "string" || Array.isArray(v);
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/variant-props.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "variantPriorityOrder": ()=>variantPriorityOrder,
    "variantProps": ()=>variantProps
});
const variantPriorityOrder = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit"
];
const variantProps = [
    "initial",
    ...variantPriorityOrder
];
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "isControllingVariants": ()=>isControllingVariants,
    "isVariantNode": ()=>isVariantNode
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$variant$2d$props$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/variant-props.mjs [app-ssr] (ecmascript)");
;
;
;
function isControllingVariants(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAnimationControls"])(props.animate) || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$variant$2d$props$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["variantProps"].some((name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVariantLabel"])(props[name]));
}
function isVariantNode(props) {
    return Boolean(isControllingVariants(props) || props.variants);
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "buildTransform": ()=>buildTransform
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$get$2d$as$2d$type$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/types/maps/number.mjs [app-ssr] (ecmascript)");
;
const translateAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective"
};
const numTransforms = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformPropOrder"].length;
/**
 * Build a CSS transform style from individual x/y/scale etc properties.
 *
 * This outputs with a default order of transforms/scales/rotations, this can be customised by
 * providing a transformTemplate function.
 */ function buildTransform(latestValues, transform, transformTemplate) {
    // The transform string we're going to build into.
    let transformString = "";
    let transformIsDefault = true;
    /**
     * Loop over all possible transforms in order, adding the ones that
     * are present to the transform string.
     */ for(let i = 0; i < numTransforms; i++){
        const key = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformPropOrder"][i];
        const value = latestValues[key];
        if (value === undefined) continue;
        let valueIsDefault = true;
        if (typeof value === "number") {
            valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
        } else {
            valueIsDefault = parseFloat(value) === 0;
        }
        if (!valueIsDefault || transformTemplate) {
            const valueAsType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$get$2d$as$2d$type$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getValueAsType"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["numberValueTypes"][key]);
            if (!valueIsDefault) {
                transformIsDefault = false;
                const transformName = translateAlias[key] || key;
                transformString += `${transformName}(${valueAsType}) `;
            }
            if (transformTemplate) {
                transform[key] = valueAsType;
            }
        }
    }
    transformString = transformString.trim();
    // If we have a custom `transform` template, pass our transform values and
    // generated transformString to that before returning
    if (transformTemplate) {
        transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
    } else if (transformIsDefault) {
        transformString = "none";
    }
    return transformString;
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "buildHTMLStyles": ()=>buildHTMLStyles
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$get$2d$as$2d$type$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/types/maps/number.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs [app-ssr] (ecmascript)");
;
;
function buildHTMLStyles(state, latestValues, transformTemplate) {
    const { style, vars, transformOrigin } = state;
    // Track whether we encounter any transform or transformOrigin values.
    let hasTransform = false;
    let hasTransformOrigin = false;
    /**
     * Loop over all our latest animated values and decide whether to handle them
     * as a style or CSS variable.
     *
     * Transforms and transform origins are kept separately for further processing.
     */ for(const key in latestValues){
        const value = latestValues[key];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformProps"].has(key)) {
            // If this is a transform, flag to enable further transform processing
            hasTransform = true;
            continue;
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCSSVariableName"])(key)) {
            vars[key] = value;
            continue;
        } else {
            // Convert the value to its default value type, ie 0 -> "0px"
            const valueAsType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$get$2d$as$2d$type$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getValueAsType"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["numberValueTypes"][key]);
            if (key.startsWith("origin")) {
                // If this is a transform origin, flag and enable further transform-origin processing
                hasTransformOrigin = true;
                transformOrigin[key] = valueAsType;
            } else {
                style[key] = valueAsType;
            }
        }
    }
    if (!latestValues.transform) {
        if (hasTransform || transformTemplate) {
            style.transform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildTransform"])(latestValues, state.transform, transformTemplate);
        } else if (style.transform) {
            /**
             * If we have previously created a transform but currently don't have any,
             * reset transform style to none.
             */ style.transform = "none";
        }
    }
    /**
     * Build a transformOrigin style. Uses the same defaults as the browser for
     * undefined origins.
     */ if (hasTransformOrigin) {
        const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
        style.transformOrigin = `${originX} ${originY} ${originZ}`;
    }
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createHtmlRenderState": ()=>createHtmlRenderState
});
const createHtmlRenderState = ()=>({
        style: {},
        transform: {},
        transformOrigin: {},
        vars: {}
    });
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/use-props.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "copyRawValuesOnly": ()=>copyRawValuesOnly,
    "useHTMLProps": ()=>useHTMLProps
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.6_@babel+core@7.28.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$is$2d$forced$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$styles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
function copyRawValuesOnly(target, source, props) {
    for(const key in source){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMotionValue"])(source[key]) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$is$2d$forced$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isForcedMotionValue"])(key, props)) {
            target[key] = source[key];
        }
    }
}
function useInitialMotionValues({ transformTemplate }, visualState) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHtmlRenderState"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$styles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildHTMLStyles"])(state, visualState, transformTemplate);
        return Object.assign({}, state.vars, state.style);
    }, [
        visualState
    ]);
}
function useStyle(props, visualState) {
    const styleProp = props.style || {};
    const style = {};
    /**
     * Copy non-Motion Values straight into style
     */ copyRawValuesOnly(style, styleProp, props);
    Object.assign(style, useInitialMotionValues(props, visualState));
    return style;
}
function useHTMLProps(props, visualState) {
    // The `any` isn't ideal but it is the type of createElement props argument
    const htmlProps = {};
    const style = useStyle(props, visualState);
    if (props.drag && props.dragListener !== false) {
        // Disable the ghost element when a user drags
        htmlProps.draggable = false;
        // Disable text selection
        style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
        // Disable scrolling on the draggable direction
        style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
    }
    if (props.tabIndex === undefined && (props.onTap || props.onTapStart || props.whileTap)) {
        htmlProps.tabIndex = 0;
    }
    htmlProps.style = style;
    return htmlProps;
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/path.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "buildSVGPath": ()=>buildSVGPath
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-ssr] (ecmascript)");
;
const dashKeys = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray"
};
const camelKeys = {
    offset: "strokeDashoffset",
    array: "strokeDasharray"
};
/**
 * Build SVG path properties. Uses the path's measured length to convert
 * our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
 * and stroke-dasharray attributes.
 *
 * This function is mutative to reduce per-frame GC.
 */ function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
    // Normalise path length by setting SVG attribute pathLength to 1
    attrs.pathLength = 1;
    // We use dash case when setting attributes directly to the DOM node and camel case
    // when defining props on a React component.
    const keys = useDashCase ? dashKeys : camelKeys;
    // Build the dash offset
    attrs[keys.offset] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"].transform(-offset);
    // Build the dash array
    const pathLength = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"].transform(length);
    const pathSpacing = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["px"].transform(spacing);
    attrs[keys.array] = `${pathLength} ${pathSpacing}`;
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "buildSVGAttrs": ()=>buildSVGAttrs
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$styles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$path$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/path.mjs [app-ssr] (ecmascript)");
;
;
/**
 * Build SVG visual attributes, like cx and style.transform
 */ function buildSVGAttrs(state, { attrX, attrY, attrScale, pathLength, pathSpacing = 1, pathOffset = 0, // This is object creation, which we try to avoid per-frame.
...latest }, isSVGTag, transformTemplate, styleProp) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$styles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildHTMLStyles"])(state, latest, transformTemplate);
    /**
     * For svg tags we just want to make sure viewBox is animatable and treat all the styles
     * as normal HTML tags.
     */ if (isSVGTag) {
        if (state.style.viewBox) {
            state.attrs.viewBox = state.style.viewBox;
        }
        return;
    }
    state.attrs = state.style;
    state.style = {};
    const { attrs, style } = state;
    /**
     * However, we apply transforms as CSS transforms.
     * So if we detect a transform, transformOrigin we take it from attrs and copy it into style.
     */ if (attrs.transform) {
        style.transform = attrs.transform;
        delete attrs.transform;
    }
    if (style.transform || attrs.transformOrigin) {
        style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
        delete attrs.transformOrigin;
    }
    if (style.transform) {
        /**
         * SVG's element transform-origin uses its own median as a reference.
         * Therefore, transformBox becomes a fill-box
         */ style.transformBox = styleProp?.transformBox ?? "fill-box";
        delete attrs.transformBox;
    }
    // Render attrX/attrY/attrScale as attributes
    if (attrX !== undefined) attrs.x = attrX;
    if (attrY !== undefined) attrs.y = attrY;
    if (attrScale !== undefined) attrs.scale = attrScale;
    // Build SVG path if one has been defined
    if (pathLength !== undefined) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$path$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildSVGPath"])(attrs, pathLength, pathSpacing, pathOffset, false);
    }
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createSvgRenderState": ()=>createSvgRenderState
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs [app-ssr] (ecmascript)");
;
const createSvgRenderState = ()=>({
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHtmlRenderState"])(),
        attrs: {}
    });
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "isSVGTag": ()=>isSVGTag
});
const isSVGTag = (tag)=>typeof tag === "string" && tag.toLowerCase() === "svg";
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/use-props.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useSVGProps": ()=>useSVGProps
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.6_@babel+core@7.28.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$use$2d$props$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/use-props.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$build$2d$attrs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$is$2d$svg$2d$tag$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
function useSVGProps(props, visualState, _isStatic, Component) {
    const visualProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSvgRenderState"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$build$2d$attrs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildSVGAttrs"])(state, visualState, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$is$2d$svg$2d$tag$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSVGTag"])(Component), props.transformTemplate, props.style);
        return {
            ...state.attrs,
            style: {
                ...state.style
            }
        };
    }, [
        visualState
    ]);
    if (props.style) {
        const rawStyles = {};
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$use$2d$props$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["copyRawValuesOnly"])(rawStyles, props.style, props);
        visualProps.style = {
            ...rawStyles,
            ...visualProps.style
        };
    }
    return visualProps;
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * We keep these listed separately as we use the lowercase tag names as part
 * of the runtime bundle to detect SVG components
 */ __turbopack_context__.s({
    "lowercaseSVGElements": ()=>lowercaseSVGElements
});
const lowercaseSVGElements = [
    "animate",
    "circle",
    "defs",
    "desc",
    "ellipse",
    "g",
    "image",
    "line",
    "filter",
    "marker",
    "mask",
    "metadata",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "rect",
    "stop",
    "switch",
    "symbol",
    "svg",
    "text",
    "tspan",
    "use",
    "view"
];
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "isSVGComponent": ()=>isSVGComponent
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$lowercase$2d$elements$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs [app-ssr] (ecmascript)");
;
function isSVGComponent(Component) {
    if (/**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */ typeof Component !== "string" || /**
         * If it contains a dash, the element is a custom HTML webcomponent.
         */ Component.includes("-")) {
        return false;
    } else if (/**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$lowercase$2d$elements$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lowercaseSVGElements"].indexOf(Component) > -1 || /**
         * If it contains a capital letter, it's an SVG component
         */ /[A-Z]/u.test(Component)) {
        return true;
    }
    return false;
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/use-render.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useRender": ()=>useRender
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.6_@babel+core@7.28.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$use$2d$props$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/use-props.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$use$2d$props$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/use-props.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$filter$2d$props$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$is$2d$svg$2d$component$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
function useRender(Component, props, ref, { latestValues }, isStatic, forwardMotionProps = false) {
    const useVisualProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$is$2d$svg$2d$component$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSVGComponent"])(Component) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$use$2d$props$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSVGProps"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$use$2d$props$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHTMLProps"];
    const visualProps = useVisualProps(props, latestValues, isStatic, Component);
    const filteredProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$filter$2d$props$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["filterProps"])(props, typeof Component === "string", forwardMotionProps);
    const elementProps = Component !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"] ? {
        ...filteredProps,
        ...visualProps,
        ref
    } : {};
    /**
     * If component has been handed a motion value as its child,
     * memoise its initial value and render that. Subsequent updates
     * will be handled by the onChange handler
     */ const { children } = props;
    const renderedChildren = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMotionValue"])(children) ? children.get() : children, [
        children
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(Component, {
        ...elementProps,
        children: renderedChildren
    });
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "resolveVariantFromProps": ()=>resolveVariantFromProps
});
function getValueState(visualElement) {
    const state = [
        {},
        {}
    ];
    visualElement?.values.forEach((value, key)=>{
        state[0][key] = value.get();
        state[1][key] = value.getVelocity();
    });
    return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
    /**
     * If the variant definition is a function, resolve.
     */ if (typeof definition === "function") {
        const [current, velocity] = getValueState(visualElement);
        definition = definition(custom !== undefined ? custom : props.custom, current, velocity);
    }
    /**
     * If the variant definition is a variant label, or
     * the function returned a variant label, resolve.
     */ if (typeof definition === "string") {
        definition = props.variants && props.variants[definition];
    }
    /**
     * At this point we've resolved both functions and variant labels,
     * but the resolved variant label might itself have been a function.
     * If so, resolve. This can only have returned a valid target object.
     */ if (typeof definition === "function") {
        const [current, velocity] = getValueState(visualElement);
        definition = definition(custom !== undefined ? custom : props.custom, current, velocity);
    }
    return definition;
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "scrapeMotionValuesFromProps": ()=>scrapeMotionValuesFromProps
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$is$2d$forced$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs [app-ssr] (ecmascript)");
;
;
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    const { style } = props;
    const newValues = {};
    for(const key in style){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMotionValue"])(style[key]) || prevProps.style && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMotionValue"])(prevProps.style[key]) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$is$2d$forced$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isForcedMotionValue"])(key, props) || visualElement?.getValue(key)?.liveStyle !== undefined) {
            newValues[key] = style[key];
        }
    }
    return newValues;
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/use-html-visual-state.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useHTMLVisualState": ()=>useHTMLVisualState
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs [app-ssr] (ecmascript)");
;
;
;
const useHTMLVisualState = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeUseVisualState"])({
    scrapeMotionValuesFromProps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scrapeMotionValuesFromProps"],
    createRenderState: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHtmlRenderState"]
});
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "scrapeMotionValuesFromProps": ()=>scrapeMotionValuesFromProps
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs [app-ssr] (ecmascript)");
;
;
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    const newValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scrapeMotionValuesFromProps"])(props, prevProps, visualElement);
    for(const key in props){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMotionValue"])(props[key]) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMotionValue"])(prevProps[key])) {
            const targetKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformPropOrder"].indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
            newValues[targetKey] = props[key];
        }
    }
    return newValues;
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/use-svg-visual-state.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useSVGVisualState": ()=>useSVGVisualState
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs [app-ssr] (ecmascript)");
;
;
;
const useSVGVisualState = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeUseVisualState"])({
    scrapeMotionValuesFromProps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scrapeMotionValuesFromProps"],
    createRenderState: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSvgRenderState"]
});
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * Convert camelCase to dash-case properties.
 */ __turbopack_context__.s({
    "camelToDash": ()=>camelToDash
});
const camelToDash = (str)=>str.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/components/create-proxy.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createMotionProxy": ()=>createMotionProxy
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/warn-once.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/motion/index.mjs [app-ssr] (ecmascript)");
;
;
function createMotionProxy(preloadedFeatures, createVisualElement) {
    if (typeof Proxy === "undefined") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createMotionComponent"];
    }
    /**
     * A cache of generated `motion` components, e.g `motion.div`, `motion.input` etc.
     * Rather than generating them anew every render.
     */ const componentCache = new Map();
    const factory = (Component, options)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createMotionComponent"])(Component, options, preloadedFeatures, createVisualElement);
    };
    /**
     * Support for deprecated`motion(Component)` pattern
     */ const deprecatedFactoryFunction = (Component, options)=>{
        if ("TURBOPACK compile-time truthy", 1) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["warnOnce"])(false, "motion() is deprecated. Use motion.create() instead.");
        }
        return factory(Component, options);
    };
    return new Proxy(deprecatedFactoryFunction, {
        /**
         * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
         * The prop name is passed through as `key` and we can use that to generate a `motion`
         * DOM component with that name.
         */ get: (_target, key)=>{
            if (key === "create") return factory;
            /**
             * If this element doesn't exist in the component cache, create it and cache.
             */ if (!componentCache.has(key)) {
                componentCache.set(key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createMotionComponent"])(key, undefined, preloadedFeatures, createVisualElement));
            }
            return componentCache.get(key);
        }
    });
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/components/m/proxy.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "m": ()=>m
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$create$2d$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/components/create-proxy.mjs [app-ssr] (ecmascript)");
;
const m = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$create$2d$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createMotionProxy"])();
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/store.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "visualElementStore": ()=>visualElementStore
});
const visualElementStore = new WeakMap();
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/motion-values.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "updateMotionValuesFromProps": ()=>updateMotionValuesFromProps
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/index.mjs [app-ssr] (ecmascript)");
;
function updateMotionValuesFromProps(element, next, prev) {
    for(const key in next){
        const nextValue = next[key];
        const prevValue = prev[key];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMotionValue"])(nextValue)) {
            /**
             * If this is a motion value found in props or style, we want to add it
             * to our visual element's motion value map.
             */ element.addValue(key, nextValue);
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMotionValue"])(prevValue)) {
            /**
             * If we're swapping from a motion value to a static value,
             * create a new motion value from that
             */ element.addValue(key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motionValue"])(nextValue, {
                owner: element
            }));
        } else if (prevValue !== nextValue) {
            /**
             * If this is a flat value that has changed, update the motion value
             * or create one if it doesn't exist. We only want to do this if we're
             * not handling the value with our animation state.
             */ if (element.hasValue(key)) {
                const existingValue = element.getValue(key);
                if (existingValue.liveStyle === true) {
                    existingValue.jump(nextValue);
                } else if (!existingValue.hasAnimated) {
                    existingValue.set(nextValue);
                }
            } else {
                const latestValue = element.getStaticValue(key);
                element.addValue(key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motionValue"])(latestValue !== undefined ? latestValue : nextValue, {
                    owner: element
                }));
            }
        }
    }
    // Handle removed values
    for(const key in prev){
        if (next[key] === undefined) element.removeValue(key);
    }
    return next;
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/VisualElement.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "VisualElement": ()=>VisualElement
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$KeyframesResolver$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/frameloop/sync-time.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$find$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/types/utils/find.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$animatable$2d$none$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$microtask$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/frameloop/microtask.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/warn-once.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$numerical$2d$string$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/is-numerical-string.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$zero$2d$value$2d$string$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/is-zero-value-string.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$subscription$2d$manager$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/subscription-manager.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/motion/features/definitions.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$geometry$2f$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/projection/geometry/models.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/utils/reduced-motion/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/utils/reduced-motion/state.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$store$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/store.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$motion$2d$values$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/motion-values.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$variants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const propEventHandlers = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete"
];
/**
 * A VisualElement is an imperative abstraction around UI elements such as
 * HTMLElement, SVGElement, Three.Object3D etc.
 */ class VisualElement {
    /**
     * This method takes React props and returns found MotionValues. For example, HTML
     * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
     *
     * This isn't an abstract method as it needs calling in the constructor, but it is
     * intended to be one.
     */ scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
        return {};
    }
    constructor({ parent, props, presenceContext, reducedMotionConfig, blockInitialAnimation, visualState }, options = {}){
        /**
         * A reference to the current underlying Instance, e.g. a HTMLElement
         * or Three.Mesh etc.
         */ this.current = null;
        /**
         * A set containing references to this VisualElement's children.
         */ this.children = new Set();
        /**
         * Determine what role this visual element should take in the variant tree.
         */ this.isVariantNode = false;
        this.isControllingVariants = false;
        /**
         * Decides whether this VisualElement should animate in reduced motion
         * mode.
         *
         * TODO: This is currently set on every individual VisualElement but feels
         * like it could be set globally.
         */ this.shouldReduceMotion = null;
        /**
         * A map of all motion values attached to this visual element. Motion
         * values are source of truth for any given animated value. A motion
         * value might be provided externally by the component via props.
         */ this.values = new Map();
        this.KeyframeResolver = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$KeyframesResolver$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KeyframeResolver"];
        /**
         * Cleanup functions for active features (hover/tap/exit etc)
         */ this.features = {};
        /**
         * A map of every subscription that binds the provided or generated
         * motion values onChange listeners to this visual element.
         */ this.valueSubscriptions = new Map();
        /**
         * A reference to the previously-provided motion values as returned
         * from scrapeMotionValuesFromProps. We use the keys in here to determine
         * if any motion values need to be removed after props are updated.
         */ this.prevMotionValues = {};
        /**
         * An object containing a SubscriptionManager for each active event.
         */ this.events = {};
        /**
         * An object containing an unsubscribe function for each prop event subscription.
         * For example, every "Update" event can have multiple subscribers via
         * VisualElement.on(), but only one of those can be defined via the onUpdate prop.
         */ this.propEventSubscriptions = {};
        this.notifyUpdate = ()=>this.notify("Update", this.latestValues);
        this.render = ()=>{
            if (!this.current) return;
            this.triggerBuild();
            this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
        };
        this.renderScheduledAt = 0.0;
        this.scheduleRender = ()=>{
            const now = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["time"].now();
            if (this.renderScheduledAt < now) {
                this.renderScheduledAt = now;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["frame"].render(this.render, false, true);
            }
        };
        const { latestValues, renderState } = visualState;
        this.latestValues = latestValues;
        this.baseTarget = {
            ...latestValues
        };
        this.initialValues = props.initial ? {
            ...latestValues
        } : {};
        this.renderState = renderState;
        this.parent = parent;
        this.props = props;
        this.presenceContext = presenceContext;
        this.depth = parent ? parent.depth + 1 : 0;
        this.reducedMotionConfig = reducedMotionConfig;
        this.options = options;
        this.blockInitialAnimation = Boolean(blockInitialAnimation);
        this.isControllingVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isControllingVariants"])(props);
        this.isVariantNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVariantNode"])(props);
        if (this.isVariantNode) {
            this.variantChildren = new Set();
        }
        this.manuallyAnimateOnMount = Boolean(parent && parent.current);
        /**
         * Any motion values that are provided to the element when created
         * aren't yet bound to the element, as this would technically be impure.
         * However, we iterate through the motion values and set them to the
         * initial values for this component.
         *
         * TODO: This is impure and we should look at changing this to run on mount.
         * Doing so will break some tests but this isn't necessarily a breaking change,
         * more a reflection of the test.
         */ const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
        for(const key in initialMotionValues){
            const value = initialMotionValues[key];
            if (latestValues[key] !== undefined && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMotionValue"])(value)) {
                value.set(latestValues[key]);
            }
        }
    }
    mount(instance) {
        this.current = instance;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$store$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visualElementStore"].set(instance, this);
        if (this.projection && !this.projection.instance) {
            this.projection.mount(instance);
        }
        if (this.parent && this.isVariantNode && !this.isControllingVariants) {
            this.removeFromVariantTree = this.parent.addVariantChild(this);
        }
        this.values.forEach((value, key)=>this.bindToMotionValue(key, value));
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasReducedMotionListener"].current) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initPrefersReducedMotion"])();
        }
        this.shouldReduceMotion = this.reducedMotionConfig === "never" ? false : this.reducedMotionConfig === "always" ? true : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prefersReducedMotion"].current;
        if ("TURBOPACK compile-time truthy", 1) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["warnOnce"])(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled");
        }
        this.parent?.addChild(this);
        this.update(this.props, this.presenceContext);
    }
    unmount() {
        this.projection && this.projection.unmount();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cancelFrame"])(this.notifyUpdate);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cancelFrame"])(this.render);
        this.valueSubscriptions.forEach((remove)=>remove());
        this.valueSubscriptions.clear();
        this.removeFromVariantTree && this.removeFromVariantTree();
        this.parent?.removeChild(this);
        for(const key in this.events){
            this.events[key].clear();
        }
        for(const key in this.features){
            const feature = this.features[key];
            if (feature) {
                feature.unmount();
                feature.isMounted = false;
            }
        }
        this.current = null;
    }
    addChild(child) {
        this.children.add(child);
        this.enteringChildren ?? (this.enteringChildren = new Set());
        this.enteringChildren.add(child);
    }
    removeChild(child) {
        this.children.delete(child);
        this.enteringChildren && this.enteringChildren.delete(child);
    }
    bindToMotionValue(key, value) {
        if (this.valueSubscriptions.has(key)) {
            this.valueSubscriptions.get(key)();
        }
        const valueIsTransform = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformProps"].has(key);
        if (valueIsTransform && this.onBindTransform) {
            this.onBindTransform();
        }
        const removeOnChange = value.on("change", (latestValue)=>{
            this.latestValues[key] = latestValue;
            this.props.onUpdate && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["frame"].preRender(this.notifyUpdate);
            if (valueIsTransform && this.projection) {
                this.projection.isTransformDirty = true;
            }
            this.scheduleRender();
        });
        let removeSyncCheck;
        if (window.MotionCheckAppearSync) {
            removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
        }
        this.valueSubscriptions.set(key, ()=>{
            removeOnChange();
            if (removeSyncCheck) removeSyncCheck();
            if (value.owner) value.stop();
        });
    }
    sortNodePosition(other) {
        /**
         * If these nodes aren't even of the same type we can't compare their depth.
         */ if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
            return 0;
        }
        return this.sortInstanceNodePosition(this.current, other.current);
    }
    updateFeatures() {
        let key = "animation";
        for(key in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["featureDefinitions"]){
            const featureDefinition = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["featureDefinitions"][key];
            if (!featureDefinition) continue;
            const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
            /**
             * If this feature is enabled but not active, make a new instance.
             */ if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) {
                this.features[key] = new FeatureConstructor(this);
            }
            /**
             * If we have a feature, mount or update it.
             */ if (this.features[key]) {
                const feature = this.features[key];
                if (feature.isMounted) {
                    feature.update();
                } else {
                    feature.mount();
                    feature.isMounted = true;
                }
            }
        }
    }
    triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props);
    }
    /**
     * Measure the current viewport box with or without transforms.
     * Only measures axis-aligned boxes, rotate and skew must be manually
     * removed with a re-render to work.
     */ measureViewportBox() {
        return this.current ? this.measureInstanceViewportBox(this.current, this.props) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$geometry$2f$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBox"])();
    }
    getStaticValue(key) {
        return this.latestValues[key];
    }
    setStaticValue(key, value) {
        this.latestValues[key] = value;
    }
    /**
     * Update the provided props. Ensure any newly-added motion values are
     * added to our map, old ones removed, and listeners updated.
     */ update(props, presenceContext) {
        if (props.transformTemplate || this.props.transformTemplate) {
            this.scheduleRender();
        }
        this.prevProps = this.props;
        this.props = props;
        this.prevPresenceContext = this.presenceContext;
        this.presenceContext = presenceContext;
        /**
         * Update prop event handlers ie onAnimationStart, onAnimationComplete
         */ for(let i = 0; i < propEventHandlers.length; i++){
            const key = propEventHandlers[i];
            if (this.propEventSubscriptions[key]) {
                this.propEventSubscriptions[key]();
                delete this.propEventSubscriptions[key];
            }
            const listenerName = "on" + key;
            const listener = props[listenerName];
            if (listener) {
                this.propEventSubscriptions[key] = this.on(key, listener);
            }
        }
        this.prevMotionValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$motion$2d$values$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateMotionValuesFromProps"])(this, this.scrapeMotionValuesFromProps(props, this.prevProps, this), this.prevMotionValues);
        if (this.handleChildMotionValue) {
            this.handleChildMotionValue();
        }
    }
    getProps() {
        return this.props;
    }
    /**
     * Returns the variant definition with a given name.
     */ getVariant(name) {
        return this.props.variants ? this.props.variants[name] : undefined;
    }
    /**
     * Returns the defined default transition on this component.
     */ getDefaultTransition() {
        return this.props.transition;
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
        return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : undefined;
    }
    /**
     * Add a child visual element to our set of children.
     */ addVariantChild(child) {
        const closestVariantNode = this.getClosestVariantNode();
        if (closestVariantNode) {
            closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
            return ()=>closestVariantNode.variantChildren.delete(child);
        }
    }
    /**
     * Add a motion value and bind it to this visual element.
     */ addValue(key, value) {
        // Remove existing value if it exists
        const existingValue = this.values.get(key);
        if (value !== existingValue) {
            if (existingValue) this.removeValue(key);
            this.bindToMotionValue(key, value);
            this.values.set(key, value);
            this.latestValues[key] = value.get();
        }
    }
    /**
     * Remove a motion value and unbind any active subscriptions.
     */ removeValue(key) {
        this.values.delete(key);
        const unsubscribe = this.valueSubscriptions.get(key);
        if (unsubscribe) {
            unsubscribe();
            this.valueSubscriptions.delete(key);
        }
        delete this.latestValues[key];
        this.removeValueFromRenderState(key, this.renderState);
    }
    /**
     * Check whether we have a motion value for this key
     */ hasValue(key) {
        return this.values.has(key);
    }
    getValue(key, defaultValue) {
        if (this.props.values && this.props.values[key]) {
            return this.props.values[key];
        }
        let value = this.values.get(key);
        if (value === undefined && defaultValue !== undefined) {
            value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motionValue"])(defaultValue === null ? undefined : defaultValue, {
                owner: this
            });
            this.addValue(key, value);
        }
        return value;
    }
    /**
     * If we're trying to animate to a previously unencountered value,
     * we need to check for it in our state and as a last resort read it
     * directly from the instance (which might have performance implications).
     */ readValue(key, target) {
        let value = this.latestValues[key] !== undefined || !this.current ? this.latestValues[key] : this.getBaseTargetFromProps(this.props, key) ?? this.readValueFromInstance(this.current, key, this.options);
        if (value !== undefined && value !== null) {
            if (typeof value === "string" && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$numerical$2d$string$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNumericalString"])(value) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$zero$2d$value$2d$string$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isZeroValueString"])(value))) {
                // If this is a number read as a string, ie "0" or "200", convert it to a number
                value = parseFloat(value);
            } else if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$find$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findValueType"])(value) && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["complex"].test(target)) {
                value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$animatable$2d$none$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAnimatableNone"])(key, target);
            }
            this.setBaseTarget(key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMotionValue"])(value) ? value.get() : value);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMotionValue"])(value) ? value.get() : value;
    }
    /**
     * Set the base target to later animate back to. This is currently
     * only hydrated on creation and when we first read a value.
     */ setBaseTarget(key, value) {
        this.baseTarget[key] = value;
    }
    /**
     * Find the base target for a value thats been removed from all animation
     * props.
     */ getBaseTarget(key) {
        const { initial } = this.props;
        let valueFromInitial;
        if (typeof initial === "string" || typeof initial === "object") {
            const variant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$variants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveVariantFromProps"])(this.props, initial, this.presenceContext?.custom);
            if (variant) {
                valueFromInitial = variant[key];
            }
        }
        /**
         * If this value still exists in the current initial variant, read that.
         */ if (initial && valueFromInitial !== undefined) {
            return valueFromInitial;
        }
        /**
         * Alternatively, if this VisualElement config has defined a getBaseTarget
         * so we can read the value from an alternative source, try that.
         */ const target = this.getBaseTargetFromProps(this.props, key);
        if (target !== undefined && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMotionValue"])(target)) return target;
        /**
         * If the value was initially defined on initial, but it doesn't any more,
         * return undefined. Otherwise return the value as initially read from the DOM.
         */ return this.initialValues[key] !== undefined && valueFromInitial === undefined ? undefined : this.baseTarget[key];
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$subscription$2d$manager$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubscriptionManager"]();
        }
        return this.events[eventName].add(callback);
    }
    notify(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].notify(...args);
        }
    }
    scheduleRenderMicrotask() {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$microtask$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["microtask"].render(this.render);
    }
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/DOMVisualElement.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "DOMVisualElement": ()=>DOMVisualElement
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$DOMKeyframesResolver$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$VisualElement$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/VisualElement.mjs [app-ssr] (ecmascript)");
;
;
class DOMVisualElement extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$VisualElement$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VisualElement"] {
    constructor(){
        super(...arguments);
        this.KeyframeResolver = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$DOMKeyframesResolver$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DOMKeyframesResolver"];
    }
    sortInstanceNodePosition(a, b) {
        /**
         * compareDocumentPosition returns a bitmask, by using the bitwise &
         * we're returning true if 2 in that bitmask is set to true. 2 is set
         * to true if b preceeds a.
         */ return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    }
    getBaseTargetFromProps(props, key) {
        return props.style ? props.style[key] : undefined;
    }
    removeValueFromRenderState(key, { vars, style }) {
        delete vars[key];
        delete style[key];
    }
    handleChildMotionValue() {
        if (this.childSubscription) {
            this.childSubscription();
            delete this.childSubscription;
        }
        const { children } = this.props;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMotionValue"])(children)) {
            this.childSubscription = children.on("change", (latest)=>{
                if (this.current) {
                    this.current.textContent = `${latest}`;
                }
            });
        }
    }
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/render.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "renderHTML": ()=>renderHTML
});
function renderHTML(element, { style, vars }, styleProp, projection) {
    const elementStyle = element.style;
    let key;
    for(key in style){
        // CSSStyleDeclaration has [index: number]: string; in the types, so we use that as key type.
        elementStyle[key] = style[key];
    }
    // Write projection styles directly to element style
    projection?.applyProjectionStyles(elementStyle, styleProp);
    for(key in vars){
        // Loop over any CSS variables and assign those.
        // They can only be assigned using `setProperty`.
        elementStyle.setProperty(key, vars[key]);
    }
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/HTMLVisualElement.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "HTMLVisualElement": ()=>HTMLVisualElement,
    "getComputedStyle": ()=>getComputedStyle
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$parse$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$utils$2f$measure$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/projection/utils/measure.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$DOMVisualElement$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/DOMVisualElement.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$styles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$render$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/render.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
function getComputedStyle(element) {
    return window.getComputedStyle(element);
}
class HTMLVisualElement extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$DOMVisualElement$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DOMVisualElement"] {
    constructor(){
        super(...arguments);
        this.type = "html";
        this.renderInstance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$render$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["renderHTML"];
    }
    readValueFromInstance(instance, key) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformProps"].has(key)) {
            return this.projection?.isProjecting ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$parse$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultTransformValue"])(key) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$parse$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readTransformValue"])(instance, key);
        } else {
            const computedStyle = getComputedStyle(instance);
            const value = ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCSSVariableName"])(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
            return typeof value === "string" ? value.trim() : value;
        }
    }
    measureInstanceViewportBox(instance, { transformPagePoint }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$utils$2f$measure$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["measureViewportBox"])(instance, transformPagePoint);
    }
    build(renderState, latestValues, props) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$styles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildHTMLStyles"])(renderState, latestValues, props.transformTemplate);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scrapeMotionValuesFromProps"])(props, prevProps, visualElement);
    }
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * A set of attribute names that are always read/written as camel case.
 */ __turbopack_context__.s({
    "camelCaseAttributes": ()=>camelCaseAttributes
});
const camelCaseAttributes = new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength",
    "startOffset",
    "textLength",
    "lengthAdjust"
]);
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/render.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "renderSVG": ()=>renderSVG
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$camel$2d$to$2d$dash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$render$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/utils/render.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$camel$2d$case$2d$attrs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs [app-ssr] (ecmascript)");
;
;
;
function renderSVG(element, renderState, _styleProp, projection) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$render$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["renderHTML"])(element, renderState, undefined, projection);
    for(const key in renderState.attrs){
        element.setAttribute(!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$camel$2d$case$2d$attrs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["camelCaseAttributes"].has(key) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$camel$2d$to$2d$dash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["camelToDash"])(key) : key, renderState.attrs[key]);
    }
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/SVGVisualElement.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "SVGVisualElement": ()=>SVGVisualElement
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$defaults$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$geometry$2f$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/projection/geometry/models.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$DOMVisualElement$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/DOMVisualElement.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$camel$2d$to$2d$dash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$build$2d$attrs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$camel$2d$case$2d$attrs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$is$2d$svg$2d$tag$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$render$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/render.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
class SVGVisualElement extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$DOMVisualElement$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DOMVisualElement"] {
    constructor(){
        super(...arguments);
        this.type = "svg";
        this.isSVGTag = false;
        this.measureInstanceViewportBox = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$geometry$2f$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBox"];
    }
    getBaseTargetFromProps(props, key) {
        return props[key];
    }
    readValueFromInstance(instance, key) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformProps"].has(key)) {
            const defaultType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$defaults$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultValueType"])(key);
            return defaultType ? defaultType.default || 0 : 0;
        }
        key = !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$camel$2d$case$2d$attrs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["camelCaseAttributes"].has(key) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$camel$2d$to$2d$dash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["camelToDash"])(key) : key;
        return instance.getAttribute(key);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scrapeMotionValuesFromProps"])(props, prevProps, visualElement);
    }
    build(renderState, latestValues, props) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$build$2d$attrs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildSVGAttrs"])(renderState, latestValues, this.isSVGTag, props.transformTemplate, props.style);
    }
    renderInstance(instance, renderState, styleProp, projection) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$render$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["renderSVG"])(instance, renderState, styleProp, projection);
    }
    mount(instance) {
        this.isSVGTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$is$2d$svg$2d$tag$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSVGTag"])(instance.tagName);
        super.mount(instance);
    }
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createDomVisualElement": ()=>createDomVisualElement
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.6_@babel+core@7.28.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$HTMLVisualElement$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/html/HTMLVisualElement.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$SVGVisualElement$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/svg/SVGVisualElement.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$is$2d$svg$2d$component$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs [app-ssr] (ecmascript)");
;
;
;
;
const createDomVisualElement = (Component, options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$is$2d$svg$2d$component$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSVGComponent"])(Component) ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$SVGVisualElement$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SVGVisualElement"](options) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$HTMLVisualElement$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HTMLVisualElement"](options, {
        allowProjection: Component !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$6_$40$babel$2b$core$40$7$2e$28$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"]
    });
};
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "resolveVariant": ()=>resolveVariant
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$variants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs [app-ssr] (ecmascript)");
;
function resolveVariant(visualElement, definition, custom) {
    const props = visualElement.getProps();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$variants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveVariantFromProps"])(props, definition, custom !== undefined ? custom : props.custom, visualElement);
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/setters.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "setTarget": ()=>setTarget
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/value/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$keyframes$2d$target$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$dynamic$2d$variants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs [app-ssr] (ecmascript)");
;
;
;
/**
 * Set VisualElement's MotionValue, creating a new MotionValue for it if
 * it doesn't exist.
 */ function setMotionValue(visualElement, key, value) {
    if (visualElement.hasValue(key)) {
        visualElement.getValue(key).set(value);
    } else {
        visualElement.addValue(key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motionValue"])(value));
    }
}
function resolveFinalValueInKeyframes(v) {
    // TODO maybe throw if v.length - 1 is placeholder token?
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$keyframes$2d$target$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isKeyframesTarget"])(v) ? v[v.length - 1] || 0 : v;
}
function setTarget(visualElement, definition) {
    const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$dynamic$2d$variants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveVariant"])(visualElement, definition);
    let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
    target = {
        ...target,
        ...transitionEnd
    };
    for(const key in target){
        const value = resolveFinalValueInKeyframes(target[key]);
        setMotionValue(visualElement, key, value);
    }
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/get-variant-context.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getVariantContext": ()=>getVariantContext
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$variant$2d$props$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/variant-props.mjs [app-ssr] (ecmascript)");
;
;
const numVariantProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$variant$2d$props$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["variantProps"].length;
function getVariantContext(visualElement) {
    if (!visualElement) return undefined;
    if (!visualElement.isControllingVariants) {
        const context = visualElement.parent ? getVariantContext(visualElement.parent) || {} : {};
        if (visualElement.props.initial !== undefined) {
            context.initial = visualElement.props.initial;
        }
        return context;
    }
    const context = {};
    for(let i = 0; i < numVariantProps; i++){
        const name = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$variant$2d$props$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["variantProps"][i];
        const prop = visualElement.props[name];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVariantLabel"])(prop) || prop === false) {
            context[name] = prop;
        }
    }
    return context;
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/animation-state.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "checkVariantsDidChange": ()=>checkVariantsDidChange,
    "createAnimationState": ()=>createAnimationState
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$interfaces$2f$visual$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/animation/interfaces/visual-element.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$calc$2d$child$2d$stagger$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/animation/utils/calc-child-stagger.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$keyframes$2d$target$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$shallow$2d$compare$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/utils/shallow-compare.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$get$2d$variant$2d$context$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/get-variant-context.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$dynamic$2d$variants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$variant$2d$props$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/variant-props.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
const reversePriorityOrder = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$variant$2d$props$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["variantPriorityOrder"]
].reverse();
const numAnimationTypes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$variant$2d$props$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["variantPriorityOrder"].length;
function animateList(visualElement) {
    return (animations)=>Promise.all(animations.map(({ animation, options })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$interfaces$2f$visual$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animateVisualElement"])(visualElement, animation, options)));
}
function createAnimationState(visualElement) {
    let animate = animateList(visualElement);
    let state = createState();
    let isInitialRender = true;
    /**
     * This function will be used to reduce the animation definitions for
     * each active animation type into an object of resolved values for it.
     */ const buildResolvedTypeValues = (type)=>(acc, definition)=>{
            const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$dynamic$2d$variants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveVariant"])(visualElement, definition, type === "exit" ? visualElement.presenceContext?.custom : undefined);
            if (resolved) {
                const { transition, transitionEnd, ...target } = resolved;
                acc = {
                    ...acc,
                    ...target,
                    ...transitionEnd
                };
            }
            return acc;
        };
    /**
     * This just allows us to inject mocked animation functions
     * @internal
     */ function setAnimateFunction(makeAnimator) {
        animate = makeAnimator(visualElement);
    }
    /**
     * When we receive new props, we need to:
     * 1. Create a list of protected keys for each type. This is a directory of
     *    value keys that are currently being "handled" by types of a higher priority
     *    so that whenever an animation is played of a given type, these values are
     *    protected from being animated.
     * 2. Determine if an animation type needs animating.
     * 3. Determine if any values have been removed from a type and figure out
     *    what to animate those to.
     */ function animateChanges(changedActiveType) {
        const { props } = visualElement;
        const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$get$2d$variant$2d$context$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVariantContext"])(visualElement.parent) || {};
        /**
         * A list of animations that we'll build into as we iterate through the animation
         * types. This will get executed at the end of the function.
         */ const animations = [];
        /**
         * Keep track of which values have been removed. Then, as we hit lower priority
         * animation types, we can check if they contain removed values and animate to that.
         */ const removedKeys = new Set();
        /**
         * A dictionary of all encountered keys. This is an object to let us build into and
         * copy it without iteration. Each time we hit an animation type we set its protected
         * keys - the keys its not allowed to animate - to the latest version of this object.
         */ let encounteredKeys = {};
        /**
         * If a variant has been removed at a given index, and this component is controlling
         * variant animations, we want to ensure lower-priority variants are forced to animate.
         */ let removedVariantIndex = Infinity;
        /**
         * Iterate through all animation types in reverse priority order. For each, we want to
         * detect which values it's handling and whether or not they've changed (and therefore
         * need to be animated). If any values have been removed, we want to detect those in
         * lower priority props and flag for animation.
         */ for(let i = 0; i < numAnimationTypes; i++){
            const type = reversePriorityOrder[i];
            const typeState = state[type];
            const prop = props[type] !== undefined ? props[type] : context[type];
            const propIsVariant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVariantLabel"])(prop);
            /**
             * If this type has *just* changed isActive status, set activeDelta
             * to that status. Otherwise set to null.
             */ const activeDelta = type === changedActiveType ? typeState.isActive : null;
            if (activeDelta === false) removedVariantIndex = i;
            /**
             * If this prop is an inherited variant, rather than been set directly on the
             * component itself, we want to make sure we allow the parent to trigger animations.
             *
             * TODO: Can probably change this to a !isControllingVariants check
             */ let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
            if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) {
                isInherited = false;
            }
            /**
             * Set all encountered keys so far as the protected keys for this type. This will
             * be any key that has been animated or otherwise handled by active, higher-priortiy types.
             */ typeState.protectedKeys = {
                ...encounteredKeys
            };
            // Check if we can skip analysing this prop early
            if (// If it isn't active and hasn't *just* been set as inactive
            !typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || // Or if the prop doesn't define an animation
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAnimationControls"])(prop) || typeof prop === "boolean") {
                continue;
            }
            /**
             * As we go look through the values defined on this type, if we detect
             * a changed value or a value that was removed in a higher priority, we set
             * this to true and add this prop to the animation list.
             */ const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
            let shouldAnimateType = variantDidChange || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i > removedVariantIndex && propIsVariant;
            let handledRemovedValues = false;
            /**
             * As animations can be set as variant lists, variants or target objects, we
             * coerce everything to an array if it isn't one already
             */ const definitionList = Array.isArray(prop) ? prop : [
                prop
            ];
            /**
             * Build an object of all the resolved values. We'll use this in the subsequent
             * animateChanges calls to determine whether a value has changed.
             */ let resolvedValues = definitionList.reduce(buildResolvedTypeValues(type), {});
            if (activeDelta === false) resolvedValues = {};
            /**
             * Now we need to loop through all the keys in the prev prop and this prop,
             * and decide:
             * 1. If the value has changed, and needs animating
             * 2. If it has been removed, and needs adding to the removedKeys set
             * 3. If it has been removed in a higher priority type and needs animating
             * 4. If it hasn't been removed in a higher priority but hasn't changed, and
             *    needs adding to the type's protectedKeys list.
             */ const { prevResolvedValues = {} } = typeState;
            const allKeys = {
                ...prevResolvedValues,
                ...resolvedValues
            };
            const markToAnimate = (key)=>{
                shouldAnimateType = true;
                if (removedKeys.has(key)) {
                    handledRemovedValues = true;
                    removedKeys.delete(key);
                }
                typeState.needsAnimating[key] = true;
                const motionValue = visualElement.getValue(key);
                if (motionValue) motionValue.liveStyle = false;
            };
            for(const key in allKeys){
                const next = resolvedValues[key];
                const prev = prevResolvedValues[key];
                // If we've already handled this we can just skip ahead
                if (encounteredKeys.hasOwnProperty(key)) continue;
                /**
                 * If the value has changed, we probably want to animate it.
                 */ let valueHasChanged = false;
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$keyframes$2d$target$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isKeyframesTarget"])(next) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$keyframes$2d$target$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isKeyframesTarget"])(prev)) {
                    valueHasChanged = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$shallow$2d$compare$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shallowCompare"])(next, prev);
                } else {
                    valueHasChanged = next !== prev;
                }
                if (valueHasChanged) {
                    if (next !== undefined && next !== null) {
                        // If next is defined and doesn't equal prev, it needs animating
                        markToAnimate(key);
                    } else {
                        // If it's undefined, it's been removed.
                        removedKeys.add(key);
                    }
                } else if (next !== undefined && removedKeys.has(key)) {
                    /**
                     * If next hasn't changed and it isn't undefined, we want to check if it's
                     * been removed by a higher priority
                     */ markToAnimate(key);
                } else {
                    /**
                     * If it hasn't changed, we add it to the list of protected values
                     * to ensure it doesn't get animated.
                     */ typeState.protectedKeys[key] = true;
                }
            }
            /**
             * Update the typeState so next time animateChanges is called we can compare the
             * latest prop and resolvedValues to these.
             */ typeState.prevProp = prop;
            typeState.prevResolvedValues = resolvedValues;
            if (typeState.isActive) {
                encounteredKeys = {
                    ...encounteredKeys,
                    ...resolvedValues
                };
            }
            if (isInitialRender && visualElement.blockInitialAnimation) {
                shouldAnimateType = false;
            }
            /**
             * If this is an inherited prop we want to skip this animation
             * unless the inherited variants haven't changed on this render.
             */ const willAnimateViaParent = isInherited && variantDidChange;
            const needsAnimating = !willAnimateViaParent || handledRemovedValues;
            if (shouldAnimateType && needsAnimating) {
                animations.push(...definitionList.map((animation)=>{
                    const options = {
                        type
                    };
                    /**
                     * If we're performing the initial animation, but we're not
                     * rendering at the same time as the variant-controlling parent,
                     * we want to use the parent's transition to calculate the stagger.
                     */ if (typeof animation === "string" && isInitialRender && !willAnimateViaParent && visualElement.manuallyAnimateOnMount && visualElement.parent) {
                        const { parent } = visualElement;
                        const parentVariant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$dynamic$2d$variants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveVariant"])(parent, animation);
                        if (parent.enteringChildren && parentVariant) {
                            const { delayChildren } = parentVariant.transition || {};
                            options.delay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$calc$2d$child$2d$stagger$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcChildStagger"])(parent.enteringChildren, visualElement, delayChildren);
                        }
                    }
                    return {
                        animation: animation,
                        options
                    };
                }));
            }
        }
        /**
         * If there are some removed value that haven't been dealt with,
         * we need to create a new animation that falls back either to the value
         * defined in the style prop, or the last read value.
         */ if (removedKeys.size) {
            const fallbackAnimation = {};
            /**
             * If the initial prop contains a transition we can use that, otherwise
             * allow the animation function to use the visual element's default.
             */ if (typeof props.initial !== "boolean") {
                const initialTransition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$dynamic$2d$variants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveVariant"])(visualElement, Array.isArray(props.initial) ? props.initial[0] : props.initial);
                if (initialTransition && initialTransition.transition) {
                    fallbackAnimation.transition = initialTransition.transition;
                }
            }
            removedKeys.forEach((key)=>{
                const fallbackTarget = visualElement.getBaseTarget(key);
                const motionValue = visualElement.getValue(key);
                if (motionValue) motionValue.liveStyle = true;
                // @ts-expect-error - @mattgperry to figure if we should do something here
                fallbackAnimation[key] = fallbackTarget ?? null;
            });
            animations.push({
                animation: fallbackAnimation
            });
        }
        let shouldAnimate = Boolean(animations.length);
        if (isInitialRender && (props.initial === false || props.initial === props.animate) && !visualElement.manuallyAnimateOnMount) {
            shouldAnimate = false;
        }
        isInitialRender = false;
        return shouldAnimate ? animate(animations) : Promise.resolve();
    }
    /**
     * Change whether a certain animation type is active.
     */ function setActive(type, isActive) {
        // If the active state hasn't changed, we can safely do nothing here
        if (state[type].isActive === isActive) return Promise.resolve();
        // Propagate active change to children
        visualElement.variantChildren?.forEach((child)=>child.animationState?.setActive(type, isActive));
        state[type].isActive = isActive;
        const animations = animateChanges(type);
        for(const key in state){
            state[key].protectedKeys = {};
        }
        return animations;
    }
    return {
        animateChanges,
        setActive,
        setAnimateFunction,
        getState: ()=>state,
        reset: ()=>{
            state = createState();
            isInitialRender = true;
        }
    };
}
function checkVariantsDidChange(prev, next) {
    if (typeof next === "string") {
        return next !== prev;
    } else if (Array.isArray(next)) {
        return !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$shallow$2d$compare$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shallowCompare"])(next, prev);
    }
    return false;
}
function createTypeState(isActive = false) {
    return {
        isActive,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {}
    };
}
function createState() {
    return {
        animate: createTypeState(true),
        whileInView: createTypeState(),
        whileHover: createTypeState(),
        whileTap: createTypeState(),
        whileDrag: createTypeState(),
        whileFocus: createTypeState(),
        exit: createTypeState()
    };
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/compare-by-depth.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "compareByDepth": ()=>compareByDepth
});
const compareByDepth = (a, b)=>a.depth - b.depth;
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "FlatTree": ()=>FlatTree
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$array$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/array.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$compare$2d$by$2d$depth$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/utils/compare-by-depth.mjs [app-ssr] (ecmascript)");
;
;
class FlatTree {
    constructor(){
        this.children = [];
        this.isDirty = false;
    }
    add(child) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$array$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addUniqueItem"])(this.children, child);
        this.isDirty = true;
    }
    remove(child) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$array$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeItem"])(this.children, child);
        this.isDirty = true;
    }
    forEach(callback) {
        this.isDirty && this.children.sort(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$compare$2d$by$2d$depth$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["compareByDepth"]);
        this.isDirty = false;
        this.children.forEach(callback);
    }
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/components/motion/feature-bundle.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "featureBundle": ()=>featureBundle
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$animations$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/motion/features/animations.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$drag$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/motion/features/drag.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$gestures$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/motion/features/gestures.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$layout$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/motion/features/layout.mjs [app-ssr] (ecmascript)");
;
;
;
;
const featureBundle = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$animations$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animations"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$gestures$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gestureAnimations"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$drag$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["drag"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$layout$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layout"]
};
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "motion": ()=>motion
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$create$2d$visual$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$create$2d$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/components/create-proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$feature$2d$bundle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/components/motion/feature-bundle.mjs [app-ssr] (ecmascript)");
;
;
;
const motion = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$create$2d$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createMotionProxy"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$feature$2d$bundle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["featureBundle"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$create$2d$visual$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDomVisualElement"]);
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/features-animation.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "domAnimation": ()=>domAnimation
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$animations$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/motion/features/animations.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$gestures$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/motion/features/gestures.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$create$2d$visual$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs [app-ssr] (ecmascript)");
;
;
;
/**
 * @public
 */ const domAnimation = {
    renderer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$create$2d$visual$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDomVisualElement"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$animations$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animations"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$gestures$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gestureAnimations"]
};
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/features-max.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "domMax": ()=>domMax
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$drag$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/motion/features/drag.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$layout$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/motion/features/layout.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$features$2d$animation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/features-animation.mjs [app-ssr] (ecmascript)");
;
;
;
/**
 * @public
 */ const domMax = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$features$2d$animation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["domAnimation"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$drag$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["drag"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$layout$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layout"]
};
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/features-min.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "domMin": ()=>domMin
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$animations$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/motion/features/animations.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$create$2d$visual$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs [app-ssr] (ecmascript)");
;
;
/**
 * @public
 */ const domMin = {
    renderer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$create$2d$visual$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDomVisualElement"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$animations$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animations"]
};
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/info.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createScrollInfo": ()=>createScrollInfo,
    "updateScrollInfo": ()=>updateScrollInfo
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$progress$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/progress.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$velocity$2d$per$2d$second$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/velocity-per-second.mjs [app-ssr] (ecmascript)");
;
/**
 * A time in milliseconds, beyond which we consider the scroll velocity to be 0.
 */ const maxElapsed = 50;
const createAxisInfo = ()=>({
        current: 0,
        offset: [],
        progress: 0,
        scrollLength: 0,
        targetOffset: 0,
        targetLength: 0,
        containerLength: 0,
        velocity: 0
    });
const createScrollInfo = ()=>({
        time: 0,
        x: createAxisInfo(),
        y: createAxisInfo()
    });
const keys = {
    x: {
        length: "Width",
        position: "Left"
    },
    y: {
        length: "Height",
        position: "Top"
    }
};
function updateAxisInfo(element, axisName, info, time) {
    const axis = info[axisName];
    const { length, position } = keys[axisName];
    const prev = axis.current;
    const prevTime = info.time;
    axis.current = element[`scroll${position}`];
    axis.scrollLength = element[`scroll${length}`] - element[`client${length}`];
    axis.offset.length = 0;
    axis.offset[0] = 0;
    axis.offset[1] = axis.scrollLength;
    axis.progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$progress$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["progress"])(0, axis.scrollLength, axis.current);
    const elapsed = time - prevTime;
    axis.velocity = elapsed > maxElapsed ? 0 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$velocity$2d$per$2d$second$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["velocityPerSecond"])(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time) {
    updateAxisInfo(element, "x", info, time);
    updateAxisInfo(element, "y", info, time);
    info.time = time;
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/inset.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "calcInset": ()=>calcInset
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$html$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/utils/is-html-element.mjs [app-ssr] (ecmascript)");
;
function calcInset(element, container) {
    const inset = {
        x: 0,
        y: 0
    };
    let current = element;
    while(current && current !== container){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$html$2d$element$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(current)) {
            inset.x += current.offsetLeft;
            inset.y += current.offsetTop;
            current = current.offsetParent;
        } else if (current.tagName === "svg") {
            /**
             * This isn't an ideal approach to measuring the offset of <svg /> tags.
             * It would be preferable, given they behave like HTMLElements in most ways
             * to use offsetLeft/Top. But these don't exist on <svg />. Likewise we
             * can't use .getBBox() like most SVG elements as these provide the offset
             * relative to the SVG itself, which for <svg /> is usually 0x0.
             */ const svgBoundingBox = current.getBoundingClientRect();
            current = current.parentElement;
            const parentBoundingBox = current.getBoundingClientRect();
            inset.x += svgBoundingBox.left - parentBoundingBox.left;
            inset.y += svgBoundingBox.top - parentBoundingBox.top;
        } else if (current instanceof SVGGraphicsElement) {
            const { x, y } = current.getBBox();
            inset.x += x;
            inset.y += y;
            let svg = null;
            let parent = current.parentNode;
            while(!svg){
                if (parent.tagName === "svg") {
                    svg = parent;
                }
                parent = current.parentNode;
            }
            current = svg;
        } else {
            break;
        }
    }
    return inset;
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/edge.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "namedEdges": ()=>namedEdges,
    "resolveEdge": ()=>resolveEdge
});
const namedEdges = {
    start: 0,
    center: 0.5,
    end: 1
};
function resolveEdge(edge, length, inset = 0) {
    let delta = 0;
    /**
     * If we have this edge defined as a preset, replace the definition
     * with the numerical value.
     */ if (edge in namedEdges) {
        edge = namedEdges[edge];
    }
    /**
     * Handle unit values
     */ if (typeof edge === "string") {
        const asNumber = parseFloat(edge);
        if (edge.endsWith("px")) {
            delta = asNumber;
        } else if (edge.endsWith("%")) {
            edge = asNumber / 100;
        } else if (edge.endsWith("vw")) {
            delta = asNumber / 100 * document.documentElement.clientWidth;
        } else if (edge.endsWith("vh")) {
            delta = asNumber / 100 * document.documentElement.clientHeight;
        } else {
            edge = asNumber;
        }
    }
    /**
     * If the edge is defined as a number, handle as a progress value.
     */ if (typeof edge === "number") {
        delta = length * edge;
    }
    return inset + delta;
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/offset.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "resolveOffset": ()=>resolveOffset
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$edge$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/edge.mjs [app-ssr] (ecmascript)");
;
const defaultOffset = [
    0,
    0
];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
    let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
    let targetPoint = 0;
    let containerPoint = 0;
    if (typeof offset === "number") {
        /**
         * If we're provided offset: [0, 0.5, 1] then each number x should become
         * [x, x], so we default to the behaviour of mapping 0 => 0 of both target
         * and container etc.
         */ offsetDefinition = [
            offset,
            offset
        ];
    } else if (typeof offset === "string") {
        offset = offset.trim();
        if (offset.includes(" ")) {
            offsetDefinition = offset.split(" ");
        } else {
            /**
             * If we're provided a definition like "100px" then we want to apply
             * that only to the top of the target point, leaving the container at 0.
             * Whereas a named offset like "end" should be applied to both.
             */ offsetDefinition = [
                offset,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$edge$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["namedEdges"][offset] ? offset : `0`
            ];
        }
    }
    targetPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$edge$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveEdge"])(offsetDefinition[0], targetLength, targetInset);
    containerPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$edge$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveEdge"])(offsetDefinition[1], containerLength);
    return targetPoint - containerPoint;
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/presets.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ScrollOffset": ()=>ScrollOffset
});
const ScrollOffset = {
    Enter: [
        [
            0,
            1
        ],
        [
            1,
            1
        ]
    ],
    Exit: [
        [
            0,
            0
        ],
        [
            1,
            0
        ]
    ],
    Any: [
        [
            1,
            0
        ],
        [
            0,
            1
        ]
    ],
    All: [
        [
            0,
            0
        ],
        [
            1,
            1
        ]
    ]
};
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "resolveOffsets": ()=>resolveOffsets
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$interpolate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/utils/interpolate.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$offsets$2f$default$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/clamp.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$inset$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/inset.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$offset$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/offset.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$presets$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/presets.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
const point = {
    x: 0,
    y: 0
};
function getTargetSize(target) {
    return "getBBox" in target && target.tagName !== "svg" ? target.getBBox() : {
        width: target.clientWidth,
        height: target.clientHeight
    };
}
function resolveOffsets(container, info, options) {
    const { offset: offsetDefinition = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$presets$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollOffset"].All } = options;
    const { target = container, axis = "y" } = options;
    const lengthLabel = axis === "y" ? "height" : "width";
    const inset = target !== container ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$inset$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcInset"])(target, container) : point;
    /**
     * Measure the target and container. If they're the same thing then we
     * use the container's scrollWidth/Height as the target, from there
     * all other calculations can remain the same.
     */ const targetSize = target === container ? {
        width: container.scrollWidth,
        height: container.scrollHeight
    } : getTargetSize(target);
    const containerSize = {
        width: container.clientWidth,
        height: container.clientHeight
    };
    /**
     * Reset the length of the resolved offset array rather than creating a new one.
     * TODO: More reusable data structures for targetSize/containerSize would also be good.
     */ info[axis].offset.length = 0;
    /**
     * Populate the offset array by resolving the user's offset definition into
     * a list of pixel scroll offets.
     */ let hasChanged = !info[axis].interpolate;
    const numOffsets = offsetDefinition.length;
    for(let i = 0; i < numOffsets; i++){
        const offset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$offset$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveOffset"])(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
        if (!hasChanged && offset !== info[axis].interpolatorOffsets[i]) {
            hasChanged = true;
        }
        info[axis].offset[i] = offset;
    }
    /**
     * If the pixel scroll offsets have changed, create a new interpolator function
     * to map scroll value into a progress.
     */ if (hasChanged) {
        info[axis].interpolate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$interpolate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["interpolate"])(info[axis].offset, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$offsets$2f$default$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultOffset"])(offsetDefinition), {
            clamp: false
        });
        info[axis].interpolatorOffsets = [
            ...info[axis].offset
        ];
    }
    info[axis].progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(0, 1, info[axis].interpolate(info[axis].current));
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/on-scroll-handler.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createOnScrollHandler": ()=>createOnScrollHandler
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/warn-once.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$info$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/info.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/index.mjs [app-ssr] (ecmascript)");
;
;
;
function measure(container, target = container, info) {
    /**
     * Find inset of target within scrollable container
     */ info.x.targetOffset = 0;
    info.y.targetOffset = 0;
    if (target !== container) {
        let node = target;
        while(node && node !== container){
            info.x.targetOffset += node.offsetLeft;
            info.y.targetOffset += node.offsetTop;
            node = node.offsetParent;
        }
    }
    info.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
    info.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
    info.x.containerLength = container.clientWidth;
    info.y.containerLength = container.clientHeight;
    /**
     * In development mode ensure scroll containers aren't position: static as this makes
     * it difficult to measure their relative positions.
     */ if ("TURBOPACK compile-time truthy", 1) {
        if (container && target && target !== container) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["warnOnce"])(getComputedStyle(container).position !== "static", "Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly.");
        }
    }
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
    return {
        measure: (time)=>{
            measure(element, options.target, info);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$info$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateScrollInfo"])(element, info, time);
            if (options.offset || options.target) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveOffsets"])(element, info, options);
            }
        },
        notify: ()=>onScroll(info)
    };
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/track.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "scrollInfo": ()=>scrollInfo
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$resize$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/resize/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/noop.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$info$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/info.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$on$2d$scroll$2d$handler$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/on-scroll-handler.mjs [app-ssr] (ecmascript)");
;
;
;
;
const scrollListeners = new WeakMap();
const resizeListeners = new WeakMap();
const onScrollHandlers = new WeakMap();
const getEventTarget = (element)=>element === document.scrollingElement ? window : element;
function scrollInfo(onScroll, { container = document.scrollingElement, ...options } = {}) {
    if (!container) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["noop"];
    let containerHandlers = onScrollHandlers.get(container);
    /**
     * Get the onScroll handlers for this container.
     * If one isn't found, create a new one.
     */ if (!containerHandlers) {
        containerHandlers = new Set();
        onScrollHandlers.set(container, containerHandlers);
    }
    /**
     * Create a new onScroll handler for the provided callback.
     */ const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$info$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createScrollInfo"])();
    const containerHandler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$on$2d$scroll$2d$handler$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOnScrollHandler"])(container, onScroll, info, options);
    containerHandlers.add(containerHandler);
    /**
     * Check if there's a scroll event listener for this container.
     * If not, create one.
     */ if (!scrollListeners.has(container)) {
        const measureAll = ()=>{
            for (const handler of containerHandlers){
                handler.measure(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["frameData"].timestamp);
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["frame"].preUpdate(notifyAll);
        };
        const notifyAll = ()=>{
            for (const handler of containerHandlers){
                handler.notify();
            }
        };
        const listener = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["frame"].read(measureAll);
        scrollListeners.set(container, listener);
        const target = getEventTarget(container);
        window.addEventListener("resize", listener, {
            passive: true
        });
        if (container !== document.documentElement) {
            resizeListeners.set(container, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$resize$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resize"])(container, listener));
        }
        target.addEventListener("scroll", listener, {
            passive: true
        });
        listener();
    }
    const listener = scrollListeners.get(container);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["frame"].read(listener, false, true);
    return ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cancelFrame"])(listener);
        /**
         * Check if we even have any handlers for this container.
         */ const currentHandlers = onScrollHandlers.get(container);
        if (!currentHandlers) return;
        currentHandlers.delete(containerHandler);
        if (currentHandlers.size) return;
        /**
         * If no more handlers, remove the scroll listener too.
         */ const scrollListener = scrollListeners.get(container);
        scrollListeners.delete(container);
        if (scrollListener) {
            getEventTarget(container).removeEventListener("scroll", scrollListener);
            resizeListeners.get(container)?.();
            window.removeEventListener("resize", scrollListener);
        }
    };
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/utils/get-timeline.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getTimeline": ()=>getTimeline
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$scroll$2d$timeline$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$track$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/track.mjs [app-ssr] (ecmascript)");
;
;
const timelineCache = new Map();
function scrollTimelineFallback(options) {
    const currentTime = {
        value: 0
    };
    const cancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$track$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scrollInfo"])((info)=>{
        currentTime.value = info[options.axis].progress * 100;
    }, options);
    return {
        currentTime,
        cancel
    };
}
function getTimeline({ source, container, ...options }) {
    const { axis } = options;
    if (source) container = source;
    const containerCache = timelineCache.get(container) ?? new Map();
    timelineCache.set(container, containerCache);
    const targetKey = options.target ?? "self";
    const targetCache = containerCache.get(targetKey) ?? {};
    const axisKey = axis + (options.offset ?? []).join(",");
    if (!targetCache[axisKey]) {
        targetCache[axisKey] = !options.target && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$scroll$2d$timeline$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supportsScrollTimeline"])() ? new ScrollTimeline({
            source: container,
            axis
        }) : scrollTimelineFallback({
            container,
            ...options
        });
    }
    return targetCache[axisKey];
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/attach-animation.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "attachToAnimation": ()=>attachToAnimation
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$scroll$2f$observe$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/scroll/observe.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$utils$2f$get$2d$timeline$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/utils/get-timeline.mjs [app-ssr] (ecmascript)");
;
;
function attachToAnimation(animation, options) {
    const timeline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$utils$2f$get$2d$timeline$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTimeline"])(options);
    return animation.attachTimeline({
        timeline: options.target ? undefined : timeline,
        observe: (valueAnimation)=>{
            valueAnimation.pause();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$scroll$2f$observe$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["observeTimeline"])((progress)=>{
                valueAnimation.time = valueAnimation.duration * progress;
            }, timeline);
        }
    });
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/attach-function.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "attachToFunction": ()=>attachToFunction
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$scroll$2f$observe$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/scroll/observe.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$track$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/track.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$utils$2f$get$2d$timeline$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/utils/get-timeline.mjs [app-ssr] (ecmascript)");
;
;
;
/**
 * If the onScroll function has two arguments, it's expecting
 * more specific information about the scroll from scrollInfo.
 */ function isOnScrollWithInfo(onScroll) {
    return onScroll.length === 2;
}
function attachToFunction(onScroll, options) {
    if (isOnScrollWithInfo(onScroll)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$track$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scrollInfo"])((info)=>{
            onScroll(info[options.axis].progress, info);
        }, options);
    } else {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$scroll$2f$observe$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["observeTimeline"])(onScroll, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$utils$2f$get$2d$timeline$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTimeline"])(options));
    }
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "scroll": ()=>scroll
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/noop.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$attach$2d$animation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/attach-animation.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$attach$2d$function$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/scroll/attach-function.mjs [app-ssr] (ecmascript)");
;
;
;
function scroll(onScroll, { axis = "y", container = document.scrollingElement, ...options } = {}) {
    if (!container) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$23$2e$6$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["noop"];
    const optionsWithDefaults = {
        axis,
        container,
        ...options
    };
    return typeof onScroll === "function" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$attach$2d$function$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["attachToFunction"])(onScroll, optionsWithDefaults) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$attach$2d$animation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["attachToAnimation"])(onScroll, optionsWithDefaults);
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/object/ObjectVisualElement.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ObjectVisualElement": ()=>ObjectVisualElement
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$geometry$2f$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/projection/geometry/models.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$VisualElement$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/VisualElement.mjs [app-ssr] (ecmascript)");
;
;
function isObjectKey(key, object) {
    return key in object;
}
class ObjectVisualElement extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$VisualElement$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VisualElement"] {
    constructor(){
        super(...arguments);
        this.type = "object";
    }
    readValueFromInstance(instance, key) {
        if (isObjectKey(key, instance)) {
            const value = instance[key];
            if (typeof value === "string" || typeof value === "number") {
                return value;
            }
        }
        return undefined;
    }
    getBaseTargetFromProps() {
        return undefined;
    }
    removeValueFromRenderState(key, renderState) {
        delete renderState.output[key];
    }
    measureInstanceViewportBox() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$12_$40$emotion$2b$is$2d$prop$2d$valid$40$1$2e$3$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$geometry$2f$models$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBox"])();
    }
    build(renderState, latestValues) {
        Object.assign(renderState.output, latestValues);
    }
    renderInstance(instance, { output }) {
        Object.assign(instance, output);
    }
    sortInstanceNodePosition() {
        return 0;
    }
}
;
}),
"[project]/node_modules/.pnpm/framer-motion@12.23.12_@emotion+is-prop-valid@1.3.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/framer-motion/dist/es/render/dom/viewport/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "inView": ()=>inView
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$resolve$2d$elements$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion-dom@12.23.12/node_modules/motion-dom/dist/es/utils/resolve-elements.mjs [app-ssr] (ecmascript)");
;
const thresholds = {
    some: 0,
    all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
    const elements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$23$2e$12$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$resolve$2d$elements$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveElements"])(elementOrSelector);
    const activeIntersections = new WeakMap();
    const onIntersectionChange = (entries)=>{
        entries.forEach((entry)=>{
            const onEnd = activeIntersections.get(entry.target);
            /**
             * If there's no change to the intersection, we don't need to
             * do anything here.
             */ if (entry.isIntersecting === Boolean(onEnd)) return;
            if (entry.isIntersecting) {
                const newOnEnd = onStart(entry.target, entry);
                if (typeof newOnEnd === "function") {
                    activeIntersections.set(entry.target, newOnEnd);
                } else {
                    observer.unobserve(entry.target);
                }
            } else if (typeof onEnd === "function") {
                onEnd(entry);
                activeIntersections.delete(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(onIntersectionChange, {
        root,
        rootMargin,
        threshold: typeof amount === "number" ? amount : thresholds[amount]
    });
    elements.forEach((element)=>observer.observe(element));
    return ()=>observer.disconnect();
}
;
}),

};

//# sourceMappingURL=90956_framer-motion_dist_es_render_7a7202ef._.js.map