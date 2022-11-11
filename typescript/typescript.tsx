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
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

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
console.log(globalStyles.fs12fw500);

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


// TODO: Opaque
type Opaque<TValue, TOpaque> = TValue & {
  __: TOpaque;
};

type ValidEmail = Opaque<string, "ValidEmail">;

const isValidEmail = (email: string): email is ValidEmail => {
  return email.includes("@");
};

const createUser = async (user: { email: ValidEmail }) => {
  // Pseudocode, creates a user in the database
  return user;
};

export const onSubmit = async (values: { email: string }) => {
  if (!isValidEmail(values.email)) {
    throw new Error("Email is invalid");
  }

  await createUser({
    email: values.email,
  });
};

// TODO: createStyleGetter
export const createStyleGetter = <TConfig extends Record<string, ViewStyle | TextStyle | ImageStyle>>(
  config: TConfig,
) => {
  return (variant: keyof TConfig, ...otherClasses: (ViewStyle | TextStyle | ImageStyle)[]): string => {
    return config[variant] + " " + otherClasses.join(" ");
  };
};

const getButtonClasses = createStyleGetter({
  primary: {
    color: 'red'
  
  },
  secondary: {},
});

const classes = getButtonClasses("primary", {width: 2});

// ------------
type RoleEnum = {
  PREMIUM_ADMIN:'PREMIUM_ADMIN',
  ADMIN:"ADMIN",
  PREMIUM_USER:'PREMIUM_USER',
  USER:"USER"
}

type ValueOfKeysStartWith<Obj> = {
  [K in Extract<keyof Obj, `PREMIUM${string}`>]: Obj[K]
}[Extract<keyof Obj, `PREMIUM${string}`>]

type ValueUnion = ValueOfKeysStartWith<RoleEnum>


// ---------
type T1 = "sx" | "sm" | string
const t1: T1 = ""
// ! Not autocomplete when call t1 === 
type T2 = "sx" | "sm" | Omit<string,"sx" | "sm">
const t2: T2 = "sm"

// -----------
type Letters  = "a" | "b" | "c"

type RemoveLetter<T, L extends string[number]> = T extends L ? never : T
type ReplaceLetter<T, L extends string[number], R extends string[number]> = T extends L ? R : T




type AfterReplace = ReplaceLetter<Letters, "c", "d">

type LetterWithoutC = RemoveLetter<Letters, "c">