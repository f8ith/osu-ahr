"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const __1 = require("..");
const parsers_1 = require("../parsers");
const MpSettingsCases_1 = require("./cases/MpSettingsCases");
const log4js_1 = __importDefault(require("log4js"));
describe("MpSettingsParserTest", function () {
    before(function () {
        log4js_1.default.configure("config/log_mocha_silent.json");
    });
    it("mp settings parse test", () => {
        const p = new parsers_1.MpSettingsParser();
        let b = false;
        chai_1.assert.isFalse(p.isParsing);
        chai_1.assert.isFalse(p.isParsed);
        chai_1.assert.isTrue(p.feedLine("Room name: 5* (´・ω・`) host rotate, History: https://osu.ppy.sh/mp/53084403"));
        chai_1.assert.isTrue(p.isParsing);
        chai_1.assert.isFalse(p.isParsed);
        chai_1.assert.isTrue(p.feedLine("Beatmap: https://osu.ppy.sh/b/853167 Silent Siren - Hachigatsu no Yoru [August]"));
        chai_1.assert.isTrue(p.feedLine("Team mode: HeadToHead, Win condition: Score"));
        chai_1.assert.isTrue(p.feedLine("Active mods: Freemod"));
        chai_1.assert.isTrue(p.feedLine("Players: 5"));
        chai_1.assert.isTrue(p.isParsing);
        chai_1.assert.isFalse(p.isParsed);
        chai_1.assert.isFalse(p.feedLine("hello!"));
        chai_1.assert.isTrue(p.isParsing);
        chai_1.assert.isFalse(p.isParsed);
        chai_1.assert.isTrue(p.feedLine("Slot 1  Not Ready https://osu.ppy.sh/u/8286882 gnsksz          [Host]"));
        chai_1.assert.isTrue(p.feedLine("Slot 2  Not Ready https://osu.ppy.sh/u/10351992 Discuzz         [Hidden, DoubleTime]"));
        chai_1.assert.isTrue(p.feedLine("Slot 3  Not Ready https://osu.ppy.sh/u/13745792 Seidosam        "));
        chai_1.assert.isTrue(p.feedLine("Slot 4  Not Ready https://osu.ppy.sh/u/7354213 Suitaksas       "));
        chai_1.assert.isTrue(p.isParsing);
        chai_1.assert.isTrue(p.feedLine("Slot 5  Not Ready https://osu.ppy.sh/u/13585495 -Kasell         "));
        chai_1.assert.isFalse(p.isParsing);
        chai_1.assert.isTrue(p.isParsed);
        chai_1.assert.isNotNull(p.result);
        const r = p.result;
        chai_1.assert.equal(r.name, "5* (´・ω・`) host rotate");
        chai_1.assert.equal(r.history, "https://osu.ppy.sh/mp/53084403");
        chai_1.assert.equal(r.beatmapUrl, "https://osu.ppy.sh/b/853167");
        chai_1.assert.equal(r.beatmapTitle, "Silent Siren - Hachigatsu no Yoru [August]");
        chai_1.assert.equal(r.teamMode, "HeadToHead");
        chai_1.assert.equal(r.winCondition, "Score");
        chai_1.assert.equal(r.activeMods, "Freemod");
        chai_1.assert.equal(r.players.length, 5);
        chai_1.assert.equal(r.players[0].name, "gnsksz");
        chai_1.assert.equal(r.players[1].name, "Discuzz");
        chai_1.assert.equal(r.players[2].name, "Seidosam");
        chai_1.assert.equal(r.players[3].name, "Suitaksas");
        chai_1.assert.equal(r.players[4].name, "-Kasell");
        chai_1.assert.equal(r.players[0].id, 8286882);
        chai_1.assert.equal(r.players[1].id, 10351992);
        chai_1.assert.equal(r.players[2].id, 13745792);
        chai_1.assert.equal(r.players[3].id, 7354213);
        chai_1.assert.equal(r.players[4].id, 13585495);
        chai_1.assert.equal(r.players[0].isHost, true);
        chai_1.assert.equal(r.players[1].isHost, false);
        chai_1.assert.equal(r.players[2].isHost, false);
        chai_1.assert.equal(r.players[3].isHost, false);
        chai_1.assert.equal(r.players[4].isHost, false);
        chai_1.assert.equal(r.players[0].team, __1.Teams.None);
        chai_1.assert.equal(r.players[1].team, __1.Teams.None);
        chai_1.assert.equal(r.players[2].team, __1.Teams.None);
        chai_1.assert.equal(r.players[3].team, __1.Teams.None);
        chai_1.assert.equal(r.players[4].team, __1.Teams.None);
        chai_1.assert.equal(r.players[0].options, "Host");
        chai_1.assert.equal(r.players[1].options, "Hidden, DoubleTime");
        chai_1.assert.equal(r.players[2].options, "");
        chai_1.assert.equal(r.players[3].options, "");
        chai_1.assert.equal(r.players[4].options, "");
    });
    it("mp settings parse with space test", () => {
        const p = new parsers_1.MpSettingsParser();
        chai_1.assert.isTrue(p.feedLine("Room name: 5* (´・ω・`) host rotate, History: https://osu.ppy.sh/mp/53084403"));
        chai_1.assert.isTrue(p.feedLine("Beatmap: https://osu.ppy.sh/b/853167 Silent Siren - Hachigatsu no Yoru [August]"));
        chai_1.assert.isTrue(p.feedLine("Team mode: HeadToHead, Win condition: Score"));
        chai_1.assert.isTrue(p.feedLine("Active mods: Freemod"));
        chai_1.assert.isTrue(p.feedLine("Players: 5"));
        chai_1.assert.isTrue(p.feedLine("Slot 1  Not Ready https://osu.ppy.sh/u/8286882 gns ksz         [Host]"));
        chai_1.assert.isTrue(p.feedLine("Slot 2  Not Ready https://osu.ppy.sh/u/10351992 Discuzz         [Hidden, DoubleTime]"));
        chai_1.assert.isTrue(p.feedLine("Slot 3  Not Ready https://osu.ppy.sh/u/13745792 Seido sam       "));
        chai_1.assert.isTrue(p.feedLine("Slot 4  Not Ready https://osu.ppy.sh/u/7354213 Suitaksas       "));
        chai_1.assert.isTrue(p.feedLine("Slot 5  Not Ready https://osu.ppy.sh/u/13585495 -Kasell         "));
        chai_1.assert.isFalse(p.isParsing);
        chai_1.assert.isNotNull(p.result);
        const r = p.result;
        chai_1.assert.equal(r.name, "5* (´・ω・`) host rotate");
        chai_1.assert.equal(r.history, "https://osu.ppy.sh/mp/53084403");
        chai_1.assert.equal(r.beatmapUrl, "https://osu.ppy.sh/b/853167");
        chai_1.assert.equal(r.beatmapTitle, "Silent Siren - Hachigatsu no Yoru [August]");
        chai_1.assert.equal(r.teamMode, "HeadToHead");
        chai_1.assert.equal(r.winCondition, "Score");
        chai_1.assert.equal(r.activeMods, "Freemod");
        chai_1.assert.equal(r.players.length, 5);
        chai_1.assert.equal(r.players[0].name, "gns ksz");
        chai_1.assert.equal(r.players[1].name, "Discuzz");
        chai_1.assert.equal(r.players[2].name, "Seido sam");
        chai_1.assert.equal(r.players[3].name, "Suitaksas");
        chai_1.assert.equal(r.players[4].name, "-Kasell");
        chai_1.assert.equal(r.players[0].id, 8286882);
        chai_1.assert.equal(r.players[1].id, 10351992);
        chai_1.assert.equal(r.players[2].id, 13745792);
        chai_1.assert.equal(r.players[3].id, 7354213);
        chai_1.assert.equal(r.players[4].id, 13585495);
        chai_1.assert.equal(r.players[0].isHost, true);
        chai_1.assert.equal(r.players[1].isHost, false);
        chai_1.assert.equal(r.players[2].isHost, false);
        chai_1.assert.equal(r.players[3].isHost, false);
        chai_1.assert.equal(r.players[4].isHost, false);
        chai_1.assert.equal(r.players[0].options, "Host");
        chai_1.assert.equal(r.players[0].team, __1.Teams.None);
        chai_1.assert.equal(r.players[1].options, "Hidden, DoubleTime");
    });
    it("mp settings parse with blackets test", () => {
        const p = new parsers_1.MpSettingsParser();
        chai_1.assert.isTrue(p.feedLine("Room name: 5* (´・ω・`) host rotate, History: https://osu.ppy.sh/mp/53084403"));
        chai_1.assert.isTrue(p.feedLine("Beatmap: https://osu.ppy.sh/b/853167 Silent Siren - Hachigatsu no Yoru [August]"));
        chai_1.assert.isTrue(p.feedLine("Team mode: HeadToHead, Win condition: Score"));
        chai_1.assert.isTrue(p.feedLine("Active mods: Freemod"));
        chai_1.assert.isTrue(p.feedLine("Players: 5"));
        chai_1.assert.isTrue(p.feedLine("Slot 1  Not Ready https://osu.ppy.sh/u/8286882 gnsksz[aueie]   [Host]"));
        chai_1.assert.isTrue(p.feedLine("Slot 2  Not Ready https://osu.ppy.sh/u/10351992 Discuzz [as]v   [Hidden, DoubleTime]"));
        chai_1.assert.isTrue(p.feedLine("Slot 3  Not Ready https://osu.ppy.sh/u/13745792 Sedo sam [quit] "));
        chai_1.assert.isTrue(p.feedLine("Slot 4  Not Ready https://osu.ppy.sh/u/7354213 Suit[__]aksas   "));
        chai_1.assert.isTrue(p.feedLine("Slot 5  Not Ready https://osu.ppy.sh/u/13585495 -K][][a sell    "));
        chai_1.assert.isFalse(p.isParsing);
        chai_1.assert.isNotNull(p.result);
        const r = p.result;
        chai_1.assert.equal(r.name, "5* (´・ω・`) host rotate");
        chai_1.assert.equal(r.history, "https://osu.ppy.sh/mp/53084403");
        chai_1.assert.equal(r.beatmapUrl, "https://osu.ppy.sh/b/853167");
        chai_1.assert.equal(r.beatmapTitle, "Silent Siren - Hachigatsu no Yoru [August]");
        chai_1.assert.equal(r.teamMode, "HeadToHead");
        chai_1.assert.equal(r.winCondition, "Score");
        chai_1.assert.equal(r.activeMods, "Freemod");
        chai_1.assert.equal(r.players.length, 5);
        chai_1.assert.equal(r.players[0].name, "gnsksz[aueie]");
        chai_1.assert.equal(r.players[1].name, "Discuzz [as]v");
        chai_1.assert.equal(r.players[2].name, "Sedo sam [quit]");
        chai_1.assert.equal(r.players[3].name, "Suit[__]aksas");
        chai_1.assert.equal(r.players[4].name, "-K][][a sell");
        chai_1.assert.equal(r.players[0].id, 8286882);
        chai_1.assert.equal(r.players[1].id, 10351992);
        chai_1.assert.equal(r.players[2].id, 13745792);
        chai_1.assert.equal(r.players[3].id, 7354213);
        chai_1.assert.equal(r.players[4].id, 13585495);
        chai_1.assert.equal(r.players[0].isHost, true);
        chai_1.assert.equal(r.players[1].isHost, false);
        chai_1.assert.equal(r.players[2].isHost, false);
        chai_1.assert.equal(r.players[3].isHost, false);
        chai_1.assert.equal(r.players[4].isHost, false);
        chai_1.assert.equal(r.players[0].options, "Host");
        chai_1.assert.equal(r.players[1].options, "Hidden, DoubleTime");
    });
    it("mp settings none orderd slot test", () => {
        const p = new parsers_1.MpSettingsParser();
        chai_1.assert.isTrue(p.feedLine("Room name: 5* (´・ω・`) host rotate, History: https://osu.ppy.sh/mp/53084403"));
        chai_1.assert.isTrue(p.feedLine("Beatmap: https://osu.ppy.sh/b/853167 Silent Siren - Hachigatsu no Yoru [August]"));
        chai_1.assert.isTrue(p.feedLine("Team mode: HeadToHead, Win condition: Score"));
        chai_1.assert.isTrue(p.feedLine("Active mods: Freemod"));
        chai_1.assert.isTrue(p.feedLine("Players: 5"));
        chai_1.assert.isTrue(p.feedLine("Slot 1  Not Ready https://osu.ppy.sh/u/8286882 gnsksz          [Host]"));
        chai_1.assert.isTrue(p.feedLine("Slot 2  Not Ready https://osu.ppy.sh/u/10351992 Discuzz         [Hidden, DoubleTime]"));
        chai_1.assert.isTrue(p.feedLine("Slot 6  Not Ready https://osu.ppy.sh/u/13745792 Seidosam        "));
        chai_1.assert.isTrue(p.feedLine("Slot 9  Not Ready https://osu.ppy.sh/u/7354213 Suitaksas       "));
        chai_1.assert.isTrue(p.feedLine("Slot 12  Not Ready https://osu.ppy.sh/u/13585495 -Kasell         "));
        chai_1.assert.isFalse(p.isParsing);
        chai_1.assert.isNotNull(p.result);
        const r = p.result;
        chai_1.assert.equal(r.name, "5* (´・ω・`) host rotate");
        chai_1.assert.equal(r.history, "https://osu.ppy.sh/mp/53084403");
        chai_1.assert.equal(r.beatmapUrl, "https://osu.ppy.sh/b/853167");
        chai_1.assert.equal(r.beatmapTitle, "Silent Siren - Hachigatsu no Yoru [August]");
        chai_1.assert.equal(r.teamMode, "HeadToHead");
        chai_1.assert.equal(r.winCondition, "Score");
        chai_1.assert.equal(r.activeMods, "Freemod");
        chai_1.assert.equal(r.players.length, 5);
        chai_1.assert.equal(r.players[0].name, "gnsksz");
        chai_1.assert.equal(r.players[1].name, "Discuzz");
        chai_1.assert.equal(r.players[2].name, "Seidosam");
        chai_1.assert.equal(r.players[3].name, "Suitaksas");
        chai_1.assert.equal(r.players[4].name, "-Kasell");
        chai_1.assert.equal(r.players[0].id, 8286882);
        chai_1.assert.equal(r.players[1].id, 10351992);
        chai_1.assert.equal(r.players[2].id, 13745792);
        chai_1.assert.equal(r.players[3].id, 7354213);
        chai_1.assert.equal(r.players[4].id, 13585495);
        chai_1.assert.equal(r.players[0].isHost, true);
        chai_1.assert.equal(r.players[1].isHost, false);
        chai_1.assert.equal(r.players[2].isHost, false);
        chai_1.assert.equal(r.players[3].isHost, false);
        chai_1.assert.equal(r.players[4].isHost, false);
        chai_1.assert.equal(r.players[0].options, "Host");
        chai_1.assert.equal(r.players[1].options, "Hidden, DoubleTime");
    });
    it("mp settings long name (15 characters)", () => {
        const p = new parsers_1.MpSettingsParser();
        chai_1.assert.isTrue(p.feedLine("Room name: 4-5* auto host rotaion, History: https://osu.ppy.sh/mp/54581109"));
        chai_1.assert.isTrue(p.feedLine("Beatmap: https://osu.ppy.sh/b/1418503 tofubeats - CANDYYYLAND feat LIZ - Pa's Lam System Remix [Nathan's Extra]"));
        chai_1.assert.isTrue(p.feedLine("Team mode: HeadToHead, Win condition: Score"));
        chai_1.assert.isTrue(p.feedLine("Active mods: Freemod"));
        chai_1.assert.isTrue(p.feedLine("Players: 8"));
        chai_1.assert.isTrue(p.feedLine("Slot 1  Not Ready https://osu.ppy.sh/u/1 0123456789abcde "));
        chai_1.assert.isTrue(p.feedLine("Slot 2  No Map    https://osu.ppy.sh/u/2 ZhiZhaChn [acv] [Hidden]"));
        chai_1.assert.isTrue(p.feedLine("Slot 3  Not Ready https://osu.ppy.sh/u/3 Hot Cocoa       "));
        chai_1.assert.isTrue(p.feedLine("Slot 4  Not Ready https://osu.ppy.sh/u/4 POv2II          "));
        chai_1.assert.isTrue(p.feedLine("Slot 6  Not Ready https://osu.ppy.sh/u/5 MONTBLANC_heart [Host]"));
        chai_1.assert.isTrue(p.feedLine("Slot 8  No Map    https://osu.ppy.sh/u/6 NewRecruit_Jack "));
        chai_1.assert.isTrue(p.feedLine("Slot 9  No Map    https://osu.ppy.sh/u/7 ya nunta        "));
        chai_1.assert.isTrue(p.feedLine("Slot 16 Not Ready https://osu.ppy.sh/u/8 Jow             [Hidden]"));
        chai_1.assert.isFalse(p.isParsing);
        chai_1.assert.isNotNull(p.result);
        const r = p.result;
        chai_1.assert.equal(r.name, "4-5* auto host rotaion");
        chai_1.assert.equal(r.history, "https://osu.ppy.sh/mp/54581109");
        chai_1.assert.equal(r.beatmapUrl, "https://osu.ppy.sh/b/1418503");
        chai_1.assert.equal(r.beatmapTitle, "tofubeats - CANDYYYLAND feat LIZ - Pa's Lam System Remix [Nathan's Extra]");
        chai_1.assert.equal(r.teamMode, "HeadToHead");
        chai_1.assert.equal(r.winCondition, "Score");
        chai_1.assert.equal(r.activeMods, "Freemod");
        chai_1.assert.equal(r.players.length, 8);
        chai_1.assert.equal(r.players[0].name, "0123456789abcde");
        chai_1.assert.equal(r.players[1].name, "ZhiZhaChn [acv]");
        chai_1.assert.equal(r.players[2].name, "Hot Cocoa");
        chai_1.assert.equal(r.players[3].name, "POv2II");
        chai_1.assert.equal(r.players[4].name, "MONTBLANC_heart");
        chai_1.assert.equal(r.players[0].id, 1);
        chai_1.assert.equal(r.players[1].id, 2);
        chai_1.assert.equal(r.players[2].id, 3);
        chai_1.assert.equal(r.players[3].id, 4);
        chai_1.assert.equal(r.players[4].id, 5);
        chai_1.assert.equal(r.players[0].isHost, false);
        chai_1.assert.equal(r.players[1].isHost, false);
        chai_1.assert.equal(r.players[2].isHost, false);
        chai_1.assert.equal(r.players[3].isHost, false);
        chai_1.assert.equal(r.players[4].isHost, true);
        chai_1.assert.equal(r.players[1].options, "Hidden");
        chai_1.assert.equal(r.players[4].options, "Host");
        chai_1.assert.equal(r.players[7].options, "Hidden");
    });
    it("mp settings host and mods", () => {
        const p = new parsers_1.MpSettingsParser();
        chai_1.assert.isTrue(p.feedLine("Room name: ahr test, History: https://osu.ppy.sh/mp/54598622"));
        chai_1.assert.isTrue(p.feedLine("Beatmap: https://osu.ppy.sh/b/86920 SID - Ranbu no Melody (TV Size) [Happy's Insane]"));
        chai_1.assert.isTrue(p.feedLine("Team mode: HeadToHead, Win condition: Score"));
        chai_1.assert.isTrue(p.feedLine("Active mods: DoubleTime, Freemod"));
        chai_1.assert.isTrue(p.feedLine("Players: 1"));
        chai_1.assert.isTrue(p.feedLine("Slot 1  Not Ready https://osu.ppy.sh/u/8286882 gnsksz          [Host / Hidden, HardRock]"));
        chai_1.assert.isFalse(p.isParsing);
        chai_1.assert.isNotNull(p.result);
        const r = p.result;
        chai_1.assert.equal(r.teamMode, "HeadToHead");
        chai_1.assert.equal(r.winCondition, "Score");
        chai_1.assert.equal(r.activeMods, "DoubleTime, Freemod");
        chai_1.assert.equal(r.players.length, 1);
        chai_1.assert.equal(r.players[0].name, "gnsksz");
        chai_1.assert.equal(r.players[0].isHost, true);
        chai_1.assert.equal(r.players[0].options, "Host / Hidden, HardRock");
    });
    it("mp settings twice", () => {
        const p = new parsers_1.MpSettingsParser();
        chai_1.assert.isTrue(p.feedLine("Room name: ahr test, History: https://osu.ppy.sh/mp/54598622"));
        chai_1.assert.isTrue(p.feedLine("Beatmap: https://osu.ppy.sh/b/86920 SID - Ranbu no Melody (TV Size) [Happy's Insane]"));
        chai_1.assert.isTrue(p.feedLine("Team mode: HeadToHead, Win condition: Score"));
        chai_1.assert.isTrue(p.feedLine("Active mods: DoubleTime, Freemod"));
        chai_1.assert.isTrue(p.feedLine("Players: 1"));
        chai_1.assert.isTrue(p.feedLine("Slot 1  Not Ready https://osu.ppy.sh/u/8286882 gnsksz          [Host / Hidden, HardRock]"));
        chai_1.assert.isFalse(p.isParsing);
        chai_1.assert.isNotNull(p.result);
        const r1 = p.result;
        chai_1.assert.equal(r1.teamMode, "HeadToHead");
        chai_1.assert.equal(r1.winCondition, "Score");
        chai_1.assert.equal(r1.activeMods, "DoubleTime, Freemod");
        chai_1.assert.equal(r1.players.length, 1);
        chai_1.assert.equal(r1.players[0].name, "gnsksz");
        chai_1.assert.equal(r1.players[0].id, 8286882);
        chai_1.assert.equal(r1.players[0].isHost, true);
        chai_1.assert.equal(r1.players[0].options, "Host / Hidden, HardRock");
        chai_1.assert.isTrue(p.isParsed);
        chai_1.assert.isFalse(p.isParsing);
        chai_1.assert.isTrue(p.feedLine("Room name: 4-5* auto host rotaion, History: https://osu.ppy.sh/mp/54581109"));
        chai_1.assert.isTrue(p.feedLine("Beatmap: https://osu.ppy.sh/b/1418503 tofubeats - CANDYYYLAND feat LIZ - Pa's Lam System Remix [Nathan's Extra]"));
        chai_1.assert.isTrue(p.feedLine("Team mode: HeadToHead, Win condition: Score"));
        chai_1.assert.isTrue(p.feedLine("Active mods: Freemod"));
        chai_1.assert.isTrue(p.feedLine("Players: 1"));
        chai_1.assert.isTrue(p.feedLine("Slot 1  Not Ready https://osu.ppy.sh/u/2 0123456789abcde "));
        chai_1.assert.isTrue(p.isParsed);
        chai_1.assert.isFalse(p.isParsing);
        chai_1.assert.isNotNull(p.result);
        const r2 = p.result;
        chai_1.assert.equal(r2.name, "4-5* auto host rotaion");
        chai_1.assert.equal(r2.history, "https://osu.ppy.sh/mp/54581109");
        chai_1.assert.equal(r2.beatmapUrl, "https://osu.ppy.sh/b/1418503");
        chai_1.assert.equal(r2.beatmapTitle, "tofubeats - CANDYYYLAND feat LIZ - Pa's Lam System Remix [Nathan's Extra]");
        chai_1.assert.equal(r2.teamMode, "HeadToHead");
        chai_1.assert.equal(r2.winCondition, "Score");
        chai_1.assert.equal(r2.activeMods, "Freemod");
        chai_1.assert.equal(r2.players.length, 1);
        chai_1.assert.equal(r2.players[0].name, "0123456789abcde");
        chai_1.assert.notEqual(r1, r2);
    });
    it("mp settings team", () => {
        const p = new parsers_1.MpSettingsParser();
        chai_1.assert.isTrue(p.feedLine("Room name: ahr test, History: https://osu.ppy.sh/mp/54598622"));
        chai_1.assert.isTrue(p.feedLine("Beatmap: https://osu.ppy.sh/b/86920 SID - Ranbu no Melody (TV Size) [Happy's Insane]"));
        chai_1.assert.isTrue(p.feedLine("Team mode: TeamVs, Win condition: Score"));
        chai_1.assert.isTrue(p.feedLine("Active mods: DoubleTime, Freemod"));
        chai_1.assert.isTrue(p.feedLine("Players: 1"));
        chai_1.assert.isTrue(p.feedLine("Slot 1  Not Ready https://osu.ppy.sh/u/8286882 gnsksz          [Host / Team Blue / Hidden, HardRock]"));
        chai_1.assert.isFalse(p.isParsing);
        chai_1.assert.isNotNull(p.result);
        const r = p.result;
        chai_1.assert.equal(r.teamMode, "TeamVs");
        chai_1.assert.equal(r.winCondition, "Score");
        chai_1.assert.equal(r.activeMods, "DoubleTime, Freemod");
        chai_1.assert.equal(r.players.length, 1);
        chai_1.assert.equal(r.players[0].name, "gnsksz");
        chai_1.assert.equal(r.players[0].id, 8286882);
        chai_1.assert.equal(r.players[0].isHost, true);
        chai_1.assert.equal(r.players[0].options, "Host / Team Blue / Hidden, HardRock");
        chai_1.assert.equal(r.players[0].team, __1.Teams.Blue);
    });
    it("check cases", () => {
        const p = new parsers_1.MpSettingsParser();
        for (let key in MpSettingsCases_1.MpSettingsCases) {
            const c = MpSettingsCases_1.MpSettingsCases[key];
            for (let t of c.texts) {
                p.feedLine(t);
            }
            chai_1.assert.isTrue(p.isParsed, c.title);
            chai_1.assert.deepEqual(p.result, c.result, c.title);
        }
    });
});
//# sourceMappingURL=MpSettingsParserTest.js.map