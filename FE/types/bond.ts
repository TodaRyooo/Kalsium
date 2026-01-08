interface Bond {
  id: string;
  identity: string;
  pass: string;
  note: string;
}

type PostBondArgs = Pick<Bond, "identity" | "pass" | "note">;
type UpdateBondArgs = Pick<Bond, "identity" | "note">;
