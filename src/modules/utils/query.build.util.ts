import { Equal } from 'typeorm';

export const queryBuildEqual = (myKey: string, value: any) => {
  return value == undefined
    ? {}
    : Object.defineProperty({}, myKey, {
        value: Equal(value),
        enumerable: true,
      });
};
