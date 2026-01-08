interface Conditions {
  len: number;
  cnt: number;
  uppr: boolean;
  symb: boolean;
  nums: boolean;
}

const passGenerator = (cond: Conditions): string[] => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let charset = lowercase;
  if (cond.uppr) charset += uppercase;
  if (cond.nums) charset += numbers;
  if (cond.symb) charset += symbols;

  const generateSingle = (): string => {
    const array = new Uint32Array(cond.len);
    crypto.getRandomValues(array);

    return Array.from(array)
      .map((x) => charset[x % charset.length])
      .join("");
  };

  return Array.from({ length: cond.cnt }, () => generateSingle());
};

export default passGenerator;
