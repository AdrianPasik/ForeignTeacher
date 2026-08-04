import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
/*
Format would be
key|0|0|0|20260101123502
date is YYYYMMDDHHMMSS

IMPORTANT - key is always in known language
*/
export class ProgressLoader {
    static load(key: string): Progress {
        const lsString = localStorage.getItem(key);
        if (!lsString) {
            return new Progress(key, []);
        }
        return Progress.fromJSON(key, lsString);
    }

    static write(progress: Progress) {
        const progressString = progress.toJSON();
        localStorage.setItem(progress.key, progressString);
    }
}

export class Progress {
    constructor(
        public key: string,
        public items: ProgressItem[],
    ) {}

    // Serialize to JSON
    toJSON(): string {
        return JSON.stringify(this.items.map((item) => item.toJSON()));
    }

    // Deserialize from JSON
    static fromJSON(key: string, json: string): Progress {
        var parsed = JSON.parse(json);
        return new Progress(
            key,
            parsed.map((chapterData: string) => ProgressItem.fromJSON(chapterData)),
        );
    }
}

export class ProgressItem {
    constructor(
        public key: string,
        public attempt: string,
        public lastAttempt: Date,
    ) {}

    toJSON(): string {
        const attemptString = this.attempt;
        const year = this.lastAttempt.getFullYear();
        const month = (this.lastAttempt.getMonth() + 1).toString().padStart(2, '0');
        const day = this.lastAttempt.getDate().toString().padStart(2, '0');
        const hour = this.lastAttempt.getHours().toString().padStart(2, '0');
        const minute = this.lastAttempt.getMinutes().toString().padStart(2, '0');
        const dateString = `${year}${month}${day}${hour}${minute}`;
        return `${this.key}|${attemptString}|${dateString}`;
    }

    static fromJSON(parsedArray: string): ProgressItem {
        const parts = parsedArray.split('|');
        if (parts.length !== 3) {
            throw new Error(`Invalid CSV format for ProgressItem: ${parsedArray}`);
        }

        const [key, attempt, lastAttempt] = parts;

        return new ProgressItem(
            key,
            attempt,
            new Date(
                parseInt(lastAttempt.substring(0, 4)), // year
                parseInt(lastAttempt.substring(4, 6)) - 1, // month
                parseInt(lastAttempt.substring(6, 8)), // day
                parseInt(lastAttempt.substring(8, 10)), // hour
                parseInt(lastAttempt.substring(10, 12)), // minute
            ),
        );
    }
}
