// Iterable map, first string doesnt seem necessary
let morseMap = new Map<string, Emoji>([
    ["e", {emoji: "e", name: "•"}],
    ["i", {emoji: "i", name: "••"}],
    ["s", {emoji: "s", name: "•••"}],
    ["t", {emoji: "t", name: "–"}],
    ["––", {emoji: "m", name: "––"}],
    ["o", {emoji: "o", name: "–––"}],
    ["u", {emoji: "u", name: "••–"}],
    ["d", {emoji: "d", name: "–••"}]
]);
export interface Emoji {
    readonly name: string;
    readonly emoji: string;
}

export class EmojiProvider {
    private _emojiMap?: Map<string, Emoji>;
    private _emojis?: readonly Emoji[];

    public get emojis(): readonly Emoji[] {
        if (!this._emojis) {
            this._emojis = Array.from(this.emojiMap.values());
        }
        return this._emojis;
    }

    public lookup(name: string): Emoji | undefined {
        return this.emojiMap.get(name.toLowerCase());
    }

    private get emojiMap(): Map<string, Emoji> {
        if (!this._emojiMap) {
            this._emojiMap = new Map<string, Emoji>();
            for (const g of morseMap) {
                if (!this._emojiMap.has(g[1].name)) {
                    this._emojiMap.set(g[1].name, { name: g[1].name, emoji: g[1].emoji });
                }
            }
        }
        return this._emojiMap;
    }
}