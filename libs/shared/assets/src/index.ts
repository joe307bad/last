const cdn = "http://localhost:8888";
const withCdn = (asset: string) => `${cdn}${asset}`;

export const Assets = {
  logo: withCdn("/logo.svg")
}
