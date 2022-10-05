//-----
// Get the first element's type in array
type FirstElementType<TArr> = TArr extends readonly [
  first: infer T,
  ...rest: any
]
  ? T
  : never;

const asConstData = ["string/ne", 1, 2, 3] as const;
const normalArray = [{ key: 1, title: "Title 1" }, { key: 2 }, { key: 3 }];
type TFiniteArr = [string, number, number];

// Finite array: string
type TFirstFiniteArray = FirstElementType<TFiniteArr>;
// Array as const: never (missing keyword `readonly`)
type TFirstAsConstArray = FirstElementType<typeof asConstData>;
type PartsOfFirstEleArray = RecursiveUnion<TFirstAsConstArray>;
// Normal array: never (don't know how many items available in array)
type TFirstNormalArray = FirstElementType<typeof normalArray>;

//-----
// Force a key must have prefix in object
type TStorageKey = {
  token: string;
  user: string;
  isLoggedIn: boolean;
};
type Prefixed<K extends string> = `${K}${keyof TStorageKey}`;
const StorageKey: { [key in Prefixed<"@">]: string } = {
  "@token": "abc",
  "@user": "123",
  "@isLoggedIn": "ttttt",
};

//------
type UnionBySlash<Path> = Path extends `${infer PartA}/${infer PartB}`
  ? PartA | PartB
  : never;
type AB = UnionBySlash<"a/b">;
//   ^?

type RecursiveUnion<
  Path extends string,
  By extends string = "-"
> = Path extends `${infer F}${By}${infer R}` ? F | RecursiveUnion<R, By> : Path;

type ABCD = RecursiveUnion<"a/b/c/d", "/">;

//--------
// import React from "react";
import { TextStyle } from "react-native";

type TConfig = { [key in keyof TextStyle]+?: Array<TextStyle[key]> };
const config: TConfig = {
  fontSize: [12, 13, 14],
};

type TObjectConfig = {
  [key in keyof TextStyle]+?: {
    [atr: string]: TextStyle[key];
  };
};
const objectConfig = Object.keys(config).reduce<TObjectConfig>((acc, key) => {
  const attributeArray = (config[key] || []).reduce((att, cur) => ({
    ...att,
    [`${cur}`]: cur,
  }));
  acc[key] = attributeArray;
  return acc;
}, {});

//global.config.ts
const fontSizeMap = {
  fs12: 12,
  fs14: 14,
  fs16: 16,
  fs18: 18,
};
const fontWeightMap = {
  fw500: "500",
  fw600: "600",
  fw800:'800'
};

type TStyleName = `${keyof typeof fontSizeMap | ""}${
  | keyof typeof fontWeightMap
  | ""}`;
type TGlobalStyles = {
  [key in TStyleName]+?: TextStyle;
};

const globalStyles: TGlobalStyles = Object.keys(
  fontSizeMap
).reduce<TGlobalStyles>((acc, fs) => {
  Object.keys(fontWeightMap).map((fw) => {
    const styleName = `${fs}${fw}` as TStyleName;
    acc[styleName] = {
      fontSize: fontSizeMap[fs],
      fontWeight: fontWeightMap[fw],
    } as TextStyle;
  }, {});
  return acc;
}, {});

// const Title = () => (
//   <Text style={[globalStyles.titleSizefw600, { backgroundColor: "red" }]}>
//     Title
//   </Text>
// );
console.log(globalStyles.fs14);

// ---------------
type Zero = "zero"
type Succ<N> = { n: N }

type One = Succ<Zero>
type Two = Succ<One>
type Three = Succ<Two>
type Four = Succ<Three>
type Five = Succ<Four>
type Six = Succ<Five>
type Seven = Succ<Six>
type Eight = Succ<Seven>
type Nine = Succ<Eight>
type Ten = Succ<Nine>

type Decrement<N> = N extends Succ<infer R> ? R : Zero

type MayBeZero = Decrement<One>


type IsZero<N> = N extends Zero ? true : false


type IfElse<C extends boolean, T, F> = C extends true ? T : F

type Equals<A, B> = A extends Succ<infer SA> 
  ? B extends Succ<infer SB>
    ? Equals<SA, SB>
    : false
  : A extends Zero
    ? B extends Zero
      ? true
      : false
    : false

type areEqual = Equals<Zero, MayBeZero>