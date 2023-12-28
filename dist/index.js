(() => {
  var e = {
    351: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, n) {
              if (n === undefined) n = r;
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return t[r];
                },
              });
            }
          : function (e, t, r, n) {
              if (n === undefined) n = r;
              e[n] = t[r];
            });
      var o =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, "default", {
                enumerable: true,
                value: t,
              });
            }
          : function (e, t) {
              e["default"] = t;
            });
      var i =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var r in e)
              if (r !== "default" && Object.hasOwnProperty.call(e, r))
                n(t, e, r);
          o(t, e);
          return t;
        };
      Object.defineProperty(t, "__esModule", { value: true });
      t.issue = t.issueCommand = void 0;
      const s = i(r(37));
      const a = r(278);
      function issueCommand(e, t, r) {
        const n = new Command(e, t, r);
        process.stdout.write(n.toString() + s.EOL);
      }
      t.issueCommand = issueCommand;
      function issue(e, t = "") {
        issueCommand(e, {}, t);
      }
      t.issue = issue;
      const u = "::";
      class Command {
        constructor(e, t, r) {
          if (!e) {
            e = "missing.command";
          }
          this.command = e;
          this.properties = t;
          this.message = r;
        }
        toString() {
          let e = u + this.command;
          if (this.properties && Object.keys(this.properties).length > 0) {
            e += " ";
            let t = true;
            for (const r in this.properties) {
              if (this.properties.hasOwnProperty(r)) {
                const n = this.properties[r];
                if (n) {
                  if (t) {
                    t = false;
                  } else {
                    e += ",";
                  }
                  e += `${r}=${escapeProperty(n)}`;
                }
              }
            }
          }
          e += `${u}${escapeData(this.message)}`;
          return e;
        }
      }
      function escapeData(e) {
        return a
          .toCommandValue(e)
          .replace(/%/g, "%25")
          .replace(/\r/g, "%0D")
          .replace(/\n/g, "%0A");
      }
      function escapeProperty(e) {
        return a
          .toCommandValue(e)
          .replace(/%/g, "%25")
          .replace(/\r/g, "%0D")
          .replace(/\n/g, "%0A")
          .replace(/:/g, "%3A")
          .replace(/,/g, "%2C");
      }
    },
    186: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, n) {
              if (n === undefined) n = r;
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return t[r];
                },
              });
            }
          : function (e, t, r, n) {
              if (n === undefined) n = r;
              e[n] = t[r];
            });
      var o =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, "default", {
                enumerable: true,
                value: t,
              });
            }
          : function (e, t) {
              e["default"] = t;
            });
      var i =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var r in e)
              if (r !== "default" && Object.hasOwnProperty.call(e, r))
                n(t, e, r);
          o(t, e);
          return t;
        };
      var s =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          function adopt(e) {
            return e instanceof r
              ? e
              : new r(function (t) {
                  t(e);
                });
          }
          return new (r || (r = Promise))(function (r, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n["throw"](e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done ? r(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", { value: true });
      t.getIDToken =
        t.getState =
        t.saveState =
        t.group =
        t.endGroup =
        t.startGroup =
        t.info =
        t.notice =
        t.warning =
        t.error =
        t.debug =
        t.isDebug =
        t.setFailed =
        t.setCommandEcho =
        t.setOutput =
        t.getBooleanInput =
        t.getMultilineInput =
        t.getInput =
        t.addPath =
        t.setSecret =
        t.exportVariable =
        t.ExitCode =
          void 0;
      const a = r(351);
      const u = r(717);
      const l = r(278);
      const c = i(r(37));
      const d = i(r(17));
      const f = r(41);
      var p;
      (function (e) {
        e[(e["Success"] = 0)] = "Success";
        e[(e["Failure"] = 1)] = "Failure";
      })((p = t.ExitCode || (t.ExitCode = {})));
      function exportVariable(e, t) {
        const r = l.toCommandValue(t);
        process.env[e] = r;
        const n = process.env["GITHUB_ENV"] || "";
        if (n) {
          return u.issueFileCommand("ENV", u.prepareKeyValueMessage(e, t));
        }
        a.issueCommand("set-env", { name: e }, r);
      }
      t.exportVariable = exportVariable;
      function setSecret(e) {
        a.issueCommand("add-mask", {}, e);
      }
      t.setSecret = setSecret;
      function addPath(e) {
        const t = process.env["GITHUB_PATH"] || "";
        if (t) {
          u.issueFileCommand("PATH", e);
        } else {
          a.issueCommand("add-path", {}, e);
        }
        process.env["PATH"] = `${e}${d.delimiter}${process.env["PATH"]}`;
      }
      t.addPath = addPath;
      function getInput(e, t) {
        const r =
          process.env[`INPUT_${e.replace(/ /g, "_").toUpperCase()}`] || "";
        if (t && t.required && !r) {
          throw new Error(`Input required and not supplied: ${e}`);
        }
        if (t && t.trimWhitespace === false) {
          return r;
        }
        return r.trim();
      }
      t.getInput = getInput;
      function getMultilineInput(e, t) {
        const r = getInput(e, t)
          .split("\n")
          .filter((e) => e !== "");
        if (t && t.trimWhitespace === false) {
          return r;
        }
        return r.map((e) => e.trim());
      }
      t.getMultilineInput = getMultilineInput;
      function getBooleanInput(e, t) {
        const r = ["true", "True", "TRUE"];
        const n = ["false", "False", "FALSE"];
        const o = getInput(e, t);
        if (r.includes(o)) return true;
        if (n.includes(o)) return false;
        throw new TypeError(
          `Input does not meet YAML 1.2 "Core Schema" specification: ${e}\n` +
            `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``
        );
      }
      t.getBooleanInput = getBooleanInput;
      function setOutput(e, t) {
        const r = process.env["GITHUB_OUTPUT"] || "";
        if (r) {
          return u.issueFileCommand("OUTPUT", u.prepareKeyValueMessage(e, t));
        }
        process.stdout.write(c.EOL);
        a.issueCommand("set-output", { name: e }, l.toCommandValue(t));
      }
      t.setOutput = setOutput;
      function setCommandEcho(e) {
        a.issue("echo", e ? "on" : "off");
      }
      t.setCommandEcho = setCommandEcho;
      function setFailed(e) {
        process.exitCode = p.Failure;
        error(e);
      }
      t.setFailed = setFailed;
      function isDebug() {
        return process.env["RUNNER_DEBUG"] === "1";
      }
      t.isDebug = isDebug;
      function debug(e) {
        a.issueCommand("debug", {}, e);
      }
      t.debug = debug;
      function error(e, t = {}) {
        a.issueCommand(
          "error",
          l.toCommandProperties(t),
          e instanceof Error ? e.toString() : e
        );
      }
      t.error = error;
      function warning(e, t = {}) {
        a.issueCommand(
          "warning",
          l.toCommandProperties(t),
          e instanceof Error ? e.toString() : e
        );
      }
      t.warning = warning;
      function notice(e, t = {}) {
        a.issueCommand(
          "notice",
          l.toCommandProperties(t),
          e instanceof Error ? e.toString() : e
        );
      }
      t.notice = notice;
      function info(e) {
        process.stdout.write(e + c.EOL);
      }
      t.info = info;
      function startGroup(e) {
        a.issue("group", e);
      }
      t.startGroup = startGroup;
      function endGroup() {
        a.issue("endgroup");
      }
      t.endGroup = endGroup;
      function group(e, t) {
        return s(this, void 0, void 0, function* () {
          startGroup(e);
          let r;
          try {
            r = yield t();
          } finally {
            endGroup();
          }
          return r;
        });
      }
      t.group = group;
      function saveState(e, t) {
        const r = process.env["GITHUB_STATE"] || "";
        if (r) {
          return u.issueFileCommand("STATE", u.prepareKeyValueMessage(e, t));
        }
        a.issueCommand("save-state", { name: e }, l.toCommandValue(t));
      }
      t.saveState = saveState;
      function getState(e) {
        return process.env[`STATE_${e}`] || "";
      }
      t.getState = getState;
      function getIDToken(e) {
        return s(this, void 0, void 0, function* () {
          return yield f.OidcClient.getIDToken(e);
        });
      }
      t.getIDToken = getIDToken;
      var h = r(327);
      Object.defineProperty(t, "summary", {
        enumerable: true,
        get: function () {
          return h.summary;
        },
      });
      var v = r(327);
      Object.defineProperty(t, "markdownSummary", {
        enumerable: true,
        get: function () {
          return v.markdownSummary;
        },
      });
      var m = r(981);
      Object.defineProperty(t, "toPosixPath", {
        enumerable: true,
        get: function () {
          return m.toPosixPath;
        },
      });
      Object.defineProperty(t, "toWin32Path", {
        enumerable: true,
        get: function () {
          return m.toWin32Path;
        },
      });
      Object.defineProperty(t, "toPlatformPath", {
        enumerable: true,
        get: function () {
          return m.toPlatformPath;
        },
      });
    },
    717: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, n) {
              if (n === undefined) n = r;
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return t[r];
                },
              });
            }
          : function (e, t, r, n) {
              if (n === undefined) n = r;
              e[n] = t[r];
            });
      var o =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, "default", {
                enumerable: true,
                value: t,
              });
            }
          : function (e, t) {
              e["default"] = t;
            });
      var i =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var r in e)
              if (r !== "default" && Object.hasOwnProperty.call(e, r))
                n(t, e, r);
          o(t, e);
          return t;
        };
      Object.defineProperty(t, "__esModule", { value: true });
      t.prepareKeyValueMessage = t.issueFileCommand = void 0;
      const s = i(r(147));
      const a = i(r(37));
      const u = r(840);
      const l = r(278);
      function issueFileCommand(e, t) {
        const r = process.env[`GITHUB_${e}`];
        if (!r) {
          throw new Error(
            `Unable to find environment variable for file command ${e}`
          );
        }
        if (!s.existsSync(r)) {
          throw new Error(`Missing file at path: ${r}`);
        }
        s.appendFileSync(r, `${l.toCommandValue(t)}${a.EOL}`, {
          encoding: "utf8",
        });
      }
      t.issueFileCommand = issueFileCommand;
      function prepareKeyValueMessage(e, t) {
        const r = `ghadelimiter_${u.v4()}`;
        const n = l.toCommandValue(t);
        if (e.includes(r)) {
          throw new Error(
            `Unexpected input: name should not contain the delimiter "${r}"`
          );
        }
        if (n.includes(r)) {
          throw new Error(
            `Unexpected input: value should not contain the delimiter "${r}"`
          );
        }
        return `${e}<<${r}${a.EOL}${n}${a.EOL}${r}`;
      }
      t.prepareKeyValueMessage = prepareKeyValueMessage;
    },
    41: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          function adopt(e) {
            return e instanceof r
              ? e
              : new r(function (t) {
                  t(e);
                });
          }
          return new (r || (r = Promise))(function (r, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n["throw"](e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done ? r(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", { value: true });
      t.OidcClient = void 0;
      const o = r(255);
      const i = r(526);
      const s = r(186);
      class OidcClient {
        static createHttpClient(e = true, t = 10) {
          const r = { allowRetries: e, maxRetries: t };
          return new o.HttpClient(
            "actions/oidc-client",
            [new i.BearerCredentialHandler(OidcClient.getRequestToken())],
            r
          );
        }
        static getRequestToken() {
          const e = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
          if (!e) {
            throw new Error(
              "Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable"
            );
          }
          return e;
        }
        static getIDTokenUrl() {
          const e = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
          if (!e) {
            throw new Error(
              "Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable"
            );
          }
          return e;
        }
        static getCall(e) {
          var t;
          return n(this, void 0, void 0, function* () {
            const r = OidcClient.createHttpClient();
            const n = yield r.getJson(e).catch((e) => {
              throw new Error(
                `Failed to get ID Token. \n \n        Error Code : ${e.statusCode}\n \n        Error Message: ${e.message}`
              );
            });
            const o =
              (t = n.result) === null || t === void 0 ? void 0 : t.value;
            if (!o) {
              throw new Error("Response json body do not have ID Token field");
            }
            return o;
          });
        }
        static getIDToken(e) {
          return n(this, void 0, void 0, function* () {
            try {
              let t = OidcClient.getIDTokenUrl();
              if (e) {
                const r = encodeURIComponent(e);
                t = `${t}&audience=${r}`;
              }
              s.debug(`ID token url is ${t}`);
              const r = yield OidcClient.getCall(t);
              s.setSecret(r);
              return r;
            } catch (e) {
              throw new Error(`Error message: ${e.message}`);
            }
          });
        }
      }
      t.OidcClient = OidcClient;
    },
    981: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, n) {
              if (n === undefined) n = r;
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return t[r];
                },
              });
            }
          : function (e, t, r, n) {
              if (n === undefined) n = r;
              e[n] = t[r];
            });
      var o =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, "default", {
                enumerable: true,
                value: t,
              });
            }
          : function (e, t) {
              e["default"] = t;
            });
      var i =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var r in e)
              if (r !== "default" && Object.hasOwnProperty.call(e, r))
                n(t, e, r);
          o(t, e);
          return t;
        };
      Object.defineProperty(t, "__esModule", { value: true });
      t.toPlatformPath = t.toWin32Path = t.toPosixPath = void 0;
      const s = i(r(17));
      function toPosixPath(e) {
        return e.replace(/[\\]/g, "/");
      }
      t.toPosixPath = toPosixPath;
      function toWin32Path(e) {
        return e.replace(/[/]/g, "\\");
      }
      t.toWin32Path = toWin32Path;
      function toPlatformPath(e) {
        return e.replace(/[/\\]/g, s.sep);
      }
      t.toPlatformPath = toPlatformPath;
    },
    327: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          function adopt(e) {
            return e instanceof r
              ? e
              : new r(function (t) {
                  t(e);
                });
          }
          return new (r || (r = Promise))(function (r, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n["throw"](e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done ? r(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", { value: true });
      t.summary =
        t.markdownSummary =
        t.SUMMARY_DOCS_URL =
        t.SUMMARY_ENV_VAR =
          void 0;
      const o = r(37);
      const i = r(147);
      const { access: s, appendFile: a, writeFile: u } = i.promises;
      t.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
      t.SUMMARY_DOCS_URL =
        "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
      class Summary {
        constructor() {
          this._buffer = "";
        }
        filePath() {
          return n(this, void 0, void 0, function* () {
            if (this._filePath) {
              return this._filePath;
            }
            const e = process.env[t.SUMMARY_ENV_VAR];
            if (!e) {
              throw new Error(
                `Unable to find environment variable for $${t.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`
              );
            }
            try {
              yield s(e, i.constants.R_OK | i.constants.W_OK);
            } catch (t) {
              throw new Error(
                `Unable to access summary file: '${e}'. Check if the file has correct read/write permissions.`
              );
            }
            this._filePath = e;
            return this._filePath;
          });
        }
        wrap(e, t, r = {}) {
          const n = Object.entries(r)
            .map(([e, t]) => ` ${e}="${t}"`)
            .join("");
          if (!t) {
            return `<${e}${n}>`;
          }
          return `<${e}${n}>${t}</${e}>`;
        }
        write(e) {
          return n(this, void 0, void 0, function* () {
            const t = !!(e === null || e === void 0 ? void 0 : e.overwrite);
            const r = yield this.filePath();
            const n = t ? u : a;
            yield n(r, this._buffer, { encoding: "utf8" });
            return this.emptyBuffer();
          });
        }
        clear() {
          return n(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({ overwrite: true });
          });
        }
        stringify() {
          return this._buffer;
        }
        isEmptyBuffer() {
          return this._buffer.length === 0;
        }
        emptyBuffer() {
          this._buffer = "";
          return this;
        }
        addRaw(e, t = false) {
          this._buffer += e;
          return t ? this.addEOL() : this;
        }
        addEOL() {
          return this.addRaw(o.EOL);
        }
        addCodeBlock(e, t) {
          const r = Object.assign({}, t && { lang: t });
          const n = this.wrap("pre", this.wrap("code", e), r);
          return this.addRaw(n).addEOL();
        }
        addList(e, t = false) {
          const r = t ? "ol" : "ul";
          const n = e.map((e) => this.wrap("li", e)).join("");
          const o = this.wrap(r, n);
          return this.addRaw(o).addEOL();
        }
        addTable(e) {
          const t = e
            .map((e) => {
              const t = e
                .map((e) => {
                  if (typeof e === "string") {
                    return this.wrap("td", e);
                  }
                  const { header: t, data: r, colspan: n, rowspan: o } = e;
                  const i = t ? "th" : "td";
                  const s = Object.assign(
                    Object.assign({}, n && { colspan: n }),
                    o && { rowspan: o }
                  );
                  return this.wrap(i, r, s);
                })
                .join("");
              return this.wrap("tr", t);
            })
            .join("");
          const r = this.wrap("table", t);
          return this.addRaw(r).addEOL();
        }
        addDetails(e, t) {
          const r = this.wrap("details", this.wrap("summary", e) + t);
          return this.addRaw(r).addEOL();
        }
        addImage(e, t, r) {
          const { width: n, height: o } = r || {};
          const i = Object.assign(
            Object.assign({}, n && { width: n }),
            o && { height: o }
          );
          const s = this.wrap(
            "img",
            null,
            Object.assign({ src: e, alt: t }, i)
          );
          return this.addRaw(s).addEOL();
        }
        addHeading(e, t) {
          const r = `h${t}`;
          const n = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(r) ? r : "h1";
          const o = this.wrap(n, e);
          return this.addRaw(o).addEOL();
        }
        addSeparator() {
          const e = this.wrap("hr", null);
          return this.addRaw(e).addEOL();
        }
        addBreak() {
          const e = this.wrap("br", null);
          return this.addRaw(e).addEOL();
        }
        addQuote(e, t) {
          const r = Object.assign({}, t && { cite: t });
          const n = this.wrap("blockquote", e, r);
          return this.addRaw(n).addEOL();
        }
        addLink(e, t) {
          const r = this.wrap("a", e, { href: t });
          return this.addRaw(r).addEOL();
        }
      }
      const l = new Summary();
      t.markdownSummary = l;
      t.summary = l;
    },
    278: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      t.toCommandProperties = t.toCommandValue = void 0;
      function toCommandValue(e) {
        if (e === null || e === undefined) {
          return "";
        } else if (typeof e === "string" || e instanceof String) {
          return e;
        }
        return JSON.stringify(e);
      }
      t.toCommandValue = toCommandValue;
      function toCommandProperties(e) {
        if (!Object.keys(e).length) {
          return {};
        }
        return {
          title: e.title,
          file: e.file,
          line: e.startLine,
          endLine: e.endLine,
          col: e.startColumn,
          endColumn: e.endColumn,
        };
      }
      t.toCommandProperties = toCommandProperties;
    },
    526: function (e, t) {
      "use strict";
      var r =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          function adopt(e) {
            return e instanceof r
              ? e
              : new r(function (t) {
                  t(e);
                });
          }
          return new (r || (r = Promise))(function (r, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n["throw"](e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done ? r(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", { value: true });
      t.PersonalAccessTokenCredentialHandler =
        t.BearerCredentialHandler =
        t.BasicCredentialHandler =
          void 0;
      class BasicCredentialHandler {
        constructor(e, t) {
          this.username = e;
          this.password = t;
        }
        prepareRequest(e) {
          if (!e.headers) {
            throw Error("The request has no headers");
          }
          e.headers["Authorization"] = `Basic ${Buffer.from(
            `${this.username}:${this.password}`
          ).toString("base64")}`;
        }
        canHandleAuthentication() {
          return false;
        }
        handleAuthentication() {
          return r(this, void 0, void 0, function* () {
            throw new Error("not implemented");
          });
        }
      }
      t.BasicCredentialHandler = BasicCredentialHandler;
      class BearerCredentialHandler {
        constructor(e) {
          this.token = e;
        }
        prepareRequest(e) {
          if (!e.headers) {
            throw Error("The request has no headers");
          }
          e.headers["Authorization"] = `Bearer ${this.token}`;
        }
        canHandleAuthentication() {
          return false;
        }
        handleAuthentication() {
          return r(this, void 0, void 0, function* () {
            throw new Error("not implemented");
          });
        }
      }
      t.BearerCredentialHandler = BearerCredentialHandler;
      class PersonalAccessTokenCredentialHandler {
        constructor(e) {
          this.token = e;
        }
        prepareRequest(e) {
          if (!e.headers) {
            throw Error("The request has no headers");
          }
          e.headers["Authorization"] = `Basic ${Buffer.from(
            `PAT:${this.token}`
          ).toString("base64")}`;
        }
        canHandleAuthentication() {
          return false;
        }
        handleAuthentication() {
          return r(this, void 0, void 0, function* () {
            throw new Error("not implemented");
          });
        }
      }
      t.PersonalAccessTokenCredentialHandler =
        PersonalAccessTokenCredentialHandler;
    },
    255: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, n) {
              if (n === undefined) n = r;
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return t[r];
                },
              });
            }
          : function (e, t, r, n) {
              if (n === undefined) n = r;
              e[n] = t[r];
            });
      var o =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, "default", {
                enumerable: true,
                value: t,
              });
            }
          : function (e, t) {
              e["default"] = t;
            });
      var i =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var r in e)
              if (r !== "default" && Object.hasOwnProperty.call(e, r))
                n(t, e, r);
          o(t, e);
          return t;
        };
      var s =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          function adopt(e) {
            return e instanceof r
              ? e
              : new r(function (t) {
                  t(e);
                });
          }
          return new (r || (r = Promise))(function (r, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n["throw"](e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done ? r(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", { value: true });
      t.HttpClient =
        t.isHttps =
        t.HttpClientResponse =
        t.HttpClientError =
        t.getProxyUrl =
        t.MediaTypes =
        t.Headers =
        t.HttpCodes =
          void 0;
      const a = i(r(685));
      const u = i(r(687));
      const l = i(r(835));
      const c = i(r(294));
      var d;
      (function (e) {
        e[(e["OK"] = 200)] = "OK";
        e[(e["MultipleChoices"] = 300)] = "MultipleChoices";
        e[(e["MovedPermanently"] = 301)] = "MovedPermanently";
        e[(e["ResourceMoved"] = 302)] = "ResourceMoved";
        e[(e["SeeOther"] = 303)] = "SeeOther";
        e[(e["NotModified"] = 304)] = "NotModified";
        e[(e["UseProxy"] = 305)] = "UseProxy";
        e[(e["SwitchProxy"] = 306)] = "SwitchProxy";
        e[(e["TemporaryRedirect"] = 307)] = "TemporaryRedirect";
        e[(e["PermanentRedirect"] = 308)] = "PermanentRedirect";
        e[(e["BadRequest"] = 400)] = "BadRequest";
        e[(e["Unauthorized"] = 401)] = "Unauthorized";
        e[(e["PaymentRequired"] = 402)] = "PaymentRequired";
        e[(e["Forbidden"] = 403)] = "Forbidden";
        e[(e["NotFound"] = 404)] = "NotFound";
        e[(e["MethodNotAllowed"] = 405)] = "MethodNotAllowed";
        e[(e["NotAcceptable"] = 406)] = "NotAcceptable";
        e[(e["ProxyAuthenticationRequired"] = 407)] =
          "ProxyAuthenticationRequired";
        e[(e["RequestTimeout"] = 408)] = "RequestTimeout";
        e[(e["Conflict"] = 409)] = "Conflict";
        e[(e["Gone"] = 410)] = "Gone";
        e[(e["TooManyRequests"] = 429)] = "TooManyRequests";
        e[(e["InternalServerError"] = 500)] = "InternalServerError";
        e[(e["NotImplemented"] = 501)] = "NotImplemented";
        e[(e["BadGateway"] = 502)] = "BadGateway";
        e[(e["ServiceUnavailable"] = 503)] = "ServiceUnavailable";
        e[(e["GatewayTimeout"] = 504)] = "GatewayTimeout";
      })((d = t.HttpCodes || (t.HttpCodes = {})));
      var f;
      (function (e) {
        e["Accept"] = "accept";
        e["ContentType"] = "content-type";
      })((f = t.Headers || (t.Headers = {})));
      var p;
      (function (e) {
        e["ApplicationJson"] = "application/json";
      })((p = t.MediaTypes || (t.MediaTypes = {})));
      function getProxyUrl(e) {
        const t = l.getProxyUrl(new URL(e));
        return t ? t.href : "";
      }
      t.getProxyUrl = getProxyUrl;
      const h = [
        d.MovedPermanently,
        d.ResourceMoved,
        d.SeeOther,
        d.TemporaryRedirect,
        d.PermanentRedirect,
      ];
      const v = [d.BadGateway, d.ServiceUnavailable, d.GatewayTimeout];
      const m = ["OPTIONS", "GET", "DELETE", "HEAD"];
      const g = 10;
      const _ = 5;
      class HttpClientError extends Error {
        constructor(e, t) {
          super(e);
          this.name = "HttpClientError";
          this.statusCode = t;
          Object.setPrototypeOf(this, HttpClientError.prototype);
        }
      }
      t.HttpClientError = HttpClientError;
      class HttpClientResponse {
        constructor(e) {
          this.message = e;
        }
        readBody() {
          return s(this, void 0, void 0, function* () {
            return new Promise((e) =>
              s(this, void 0, void 0, function* () {
                let t = Buffer.alloc(0);
                this.message.on("data", (e) => {
                  t = Buffer.concat([t, e]);
                });
                this.message.on("end", () => {
                  e(t.toString());
                });
              })
            );
          });
        }
      }
      t.HttpClientResponse = HttpClientResponse;
      function isHttps(e) {
        const t = new URL(e);
        return t.protocol === "https:";
      }
      t.isHttps = isHttps;
      class HttpClient {
        constructor(e, t, r) {
          this._ignoreSslError = false;
          this._allowRedirects = true;
          this._allowRedirectDowngrade = false;
          this._maxRedirects = 50;
          this._allowRetries = false;
          this._maxRetries = 1;
          this._keepAlive = false;
          this._disposed = false;
          this.userAgent = e;
          this.handlers = t || [];
          this.requestOptions = r;
          if (r) {
            if (r.ignoreSslError != null) {
              this._ignoreSslError = r.ignoreSslError;
            }
            this._socketTimeout = r.socketTimeout;
            if (r.allowRedirects != null) {
              this._allowRedirects = r.allowRedirects;
            }
            if (r.allowRedirectDowngrade != null) {
              this._allowRedirectDowngrade = r.allowRedirectDowngrade;
            }
            if (r.maxRedirects != null) {
              this._maxRedirects = Math.max(r.maxRedirects, 0);
            }
            if (r.keepAlive != null) {
              this._keepAlive = r.keepAlive;
            }
            if (r.allowRetries != null) {
              this._allowRetries = r.allowRetries;
            }
            if (r.maxRetries != null) {
              this._maxRetries = r.maxRetries;
            }
          }
        }
        options(e, t) {
          return s(this, void 0, void 0, function* () {
            return this.request("OPTIONS", e, null, t || {});
          });
        }
        get(e, t) {
          return s(this, void 0, void 0, function* () {
            return this.request("GET", e, null, t || {});
          });
        }
        del(e, t) {
          return s(this, void 0, void 0, function* () {
            return this.request("DELETE", e, null, t || {});
          });
        }
        post(e, t, r) {
          return s(this, void 0, void 0, function* () {
            return this.request("POST", e, t, r || {});
          });
        }
        patch(e, t, r) {
          return s(this, void 0, void 0, function* () {
            return this.request("PATCH", e, t, r || {});
          });
        }
        put(e, t, r) {
          return s(this, void 0, void 0, function* () {
            return this.request("PUT", e, t, r || {});
          });
        }
        head(e, t) {
          return s(this, void 0, void 0, function* () {
            return this.request("HEAD", e, null, t || {});
          });
        }
        sendStream(e, t, r, n) {
          return s(this, void 0, void 0, function* () {
            return this.request(e, t, r, n);
          });
        }
        getJson(e, t = {}) {
          return s(this, void 0, void 0, function* () {
            t[f.Accept] = this._getExistingOrDefaultHeader(
              t,
              f.Accept,
              p.ApplicationJson
            );
            const r = yield this.get(e, t);
            return this._processResponse(r, this.requestOptions);
          });
        }
        postJson(e, t, r = {}) {
          return s(this, void 0, void 0, function* () {
            const n = JSON.stringify(t, null, 2);
            r[f.Accept] = this._getExistingOrDefaultHeader(
              r,
              f.Accept,
              p.ApplicationJson
            );
            r[f.ContentType] = this._getExistingOrDefaultHeader(
              r,
              f.ContentType,
              p.ApplicationJson
            );
            const o = yield this.post(e, n, r);
            return this._processResponse(o, this.requestOptions);
          });
        }
        putJson(e, t, r = {}) {
          return s(this, void 0, void 0, function* () {
            const n = JSON.stringify(t, null, 2);
            r[f.Accept] = this._getExistingOrDefaultHeader(
              r,
              f.Accept,
              p.ApplicationJson
            );
            r[f.ContentType] = this._getExistingOrDefaultHeader(
              r,
              f.ContentType,
              p.ApplicationJson
            );
            const o = yield this.put(e, n, r);
            return this._processResponse(o, this.requestOptions);
          });
        }
        patchJson(e, t, r = {}) {
          return s(this, void 0, void 0, function* () {
            const n = JSON.stringify(t, null, 2);
            r[f.Accept] = this._getExistingOrDefaultHeader(
              r,
              f.Accept,
              p.ApplicationJson
            );
            r[f.ContentType] = this._getExistingOrDefaultHeader(
              r,
              f.ContentType,
              p.ApplicationJson
            );
            const o = yield this.patch(e, n, r);
            return this._processResponse(o, this.requestOptions);
          });
        }
        request(e, t, r, n) {
          return s(this, void 0, void 0, function* () {
            if (this._disposed) {
              throw new Error("Client has already been disposed.");
            }
            const o = new URL(t);
            let i = this._prepareRequest(e, o, n);
            const s =
              this._allowRetries && m.includes(e) ? this._maxRetries + 1 : 1;
            let a = 0;
            let u;
            do {
              u = yield this.requestRaw(i, r);
              if (u && u.message && u.message.statusCode === d.Unauthorized) {
                let e;
                for (const t of this.handlers) {
                  if (t.canHandleAuthentication(u)) {
                    e = t;
                    break;
                  }
                }
                if (e) {
                  return e.handleAuthentication(this, i, r);
                } else {
                  return u;
                }
              }
              let t = this._maxRedirects;
              while (
                u.message.statusCode &&
                h.includes(u.message.statusCode) &&
                this._allowRedirects &&
                t > 0
              ) {
                const s = u.message.headers["location"];
                if (!s) {
                  break;
                }
                const a = new URL(s);
                if (
                  o.protocol === "https:" &&
                  o.protocol !== a.protocol &&
                  !this._allowRedirectDowngrade
                ) {
                  throw new Error(
                    "Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true."
                  );
                }
                yield u.readBody();
                if (a.hostname !== o.hostname) {
                  for (const e in n) {
                    if (e.toLowerCase() === "authorization") {
                      delete n[e];
                    }
                  }
                }
                i = this._prepareRequest(e, a, n);
                u = yield this.requestRaw(i, r);
                t--;
              }
              if (!u.message.statusCode || !v.includes(u.message.statusCode)) {
                return u;
              }
              a += 1;
              if (a < s) {
                yield u.readBody();
                yield this._performExponentialBackoff(a);
              }
            } while (a < s);
            return u;
          });
        }
        dispose() {
          if (this._agent) {
            this._agent.destroy();
          }
          this._disposed = true;
        }
        requestRaw(e, t) {
          return s(this, void 0, void 0, function* () {
            return new Promise((r, n) => {
              function callbackForResult(e, t) {
                if (e) {
                  n(e);
                } else if (!t) {
                  n(new Error("Unknown error"));
                } else {
                  r(t);
                }
              }
              this.requestRawWithCallback(e, t, callbackForResult);
            });
          });
        }
        requestRawWithCallback(e, t, r) {
          if (typeof t === "string") {
            if (!e.options.headers) {
              e.options.headers = {};
            }
            e.options.headers["Content-Length"] = Buffer.byteLength(t, "utf8");
          }
          let n = false;
          function handleResult(e, t) {
            if (!n) {
              n = true;
              r(e, t);
            }
          }
          const o = e.httpModule.request(e.options, (e) => {
            const t = new HttpClientResponse(e);
            handleResult(undefined, t);
          });
          let i;
          o.on("socket", (e) => {
            i = e;
          });
          o.setTimeout(this._socketTimeout || 3 * 6e4, () => {
            if (i) {
              i.end();
            }
            handleResult(new Error(`Request timeout: ${e.options.path}`));
          });
          o.on("error", function (e) {
            handleResult(e);
          });
          if (t && typeof t === "string") {
            o.write(t, "utf8");
          }
          if (t && typeof t !== "string") {
            t.on("close", function () {
              o.end();
            });
            t.pipe(o);
          } else {
            o.end();
          }
        }
        getAgent(e) {
          const t = new URL(e);
          return this._getAgent(t);
        }
        _prepareRequest(e, t, r) {
          const n = {};
          n.parsedUrl = t;
          const o = n.parsedUrl.protocol === "https:";
          n.httpModule = o ? u : a;
          const i = o ? 443 : 80;
          n.options = {};
          n.options.host = n.parsedUrl.hostname;
          n.options.port = n.parsedUrl.port ? parseInt(n.parsedUrl.port) : i;
          n.options.path =
            (n.parsedUrl.pathname || "") + (n.parsedUrl.search || "");
          n.options.method = e;
          n.options.headers = this._mergeHeaders(r);
          if (this.userAgent != null) {
            n.options.headers["user-agent"] = this.userAgent;
          }
          n.options.agent = this._getAgent(n.parsedUrl);
          if (this.handlers) {
            for (const e of this.handlers) {
              e.prepareRequest(n.options);
            }
          }
          return n;
        }
        _mergeHeaders(e) {
          if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign(
              {},
              lowercaseKeys(this.requestOptions.headers),
              lowercaseKeys(e || {})
            );
          }
          return lowercaseKeys(e || {});
        }
        _getExistingOrDefaultHeader(e, t, r) {
          let n;
          if (this.requestOptions && this.requestOptions.headers) {
            n = lowercaseKeys(this.requestOptions.headers)[t];
          }
          return e[t] || n || r;
        }
        _getAgent(e) {
          let t;
          const r = l.getProxyUrl(e);
          const n = r && r.hostname;
          if (this._keepAlive && n) {
            t = this._proxyAgent;
          }
          if (this._keepAlive && !n) {
            t = this._agent;
          }
          if (t) {
            return t;
          }
          const o = e.protocol === "https:";
          let i = 100;
          if (this.requestOptions) {
            i = this.requestOptions.maxSockets || a.globalAgent.maxSockets;
          }
          if (r && r.hostname) {
            const e = {
              maxSockets: i,
              keepAlive: this._keepAlive,
              proxy: Object.assign(
                Object.assign(
                  {},
                  (r.username || r.password) && {
                    proxyAuth: `${r.username}:${r.password}`,
                  }
                ),
                { host: r.hostname, port: r.port }
              ),
            };
            let n;
            const s = r.protocol === "https:";
            if (o) {
              n = s ? c.httpsOverHttps : c.httpsOverHttp;
            } else {
              n = s ? c.httpOverHttps : c.httpOverHttp;
            }
            t = n(e);
            this._proxyAgent = t;
          }
          if (this._keepAlive && !t) {
            const e = { keepAlive: this._keepAlive, maxSockets: i };
            t = o ? new u.Agent(e) : new a.Agent(e);
            this._agent = t;
          }
          if (!t) {
            t = o ? u.globalAgent : a.globalAgent;
          }
          if (o && this._ignoreSslError) {
            t.options = Object.assign(t.options || {}, {
              rejectUnauthorized: false,
            });
          }
          return t;
        }
        _performExponentialBackoff(e) {
          return s(this, void 0, void 0, function* () {
            e = Math.min(g, e);
            const t = _ * Math.pow(2, e);
            return new Promise((e) => setTimeout(() => e(), t));
          });
        }
        _processResponse(e, t) {
          return s(this, void 0, void 0, function* () {
            return new Promise((r, n) =>
              s(this, void 0, void 0, function* () {
                const o = e.message.statusCode || 0;
                const i = { statusCode: o, result: null, headers: {} };
                if (o === d.NotFound) {
                  r(i);
                }
                function dateTimeDeserializer(e, t) {
                  if (typeof t === "string") {
                    const e = new Date(t);
                    if (!isNaN(e.valueOf())) {
                      return e;
                    }
                  }
                  return t;
                }
                let s;
                let a;
                try {
                  a = yield e.readBody();
                  if (a && a.length > 0) {
                    if (t && t.deserializeDates) {
                      s = JSON.parse(a, dateTimeDeserializer);
                    } else {
                      s = JSON.parse(a);
                    }
                    i.result = s;
                  }
                  i.headers = e.message.headers;
                } catch (e) {}
                if (o > 299) {
                  let e;
                  if (s && s.message) {
                    e = s.message;
                  } else if (a && a.length > 0) {
                    e = a;
                  } else {
                    e = `Failed request: (${o})`;
                  }
                  const t = new HttpClientError(e, o);
                  t.result = i.result;
                  n(t);
                } else {
                  r(i);
                }
              })
            );
          });
        }
      }
      t.HttpClient = HttpClient;
      const lowercaseKeys = (e) =>
        Object.keys(e).reduce((t, r) => ((t[r.toLowerCase()] = e[r]), t), {});
    },
    835: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      t.checkBypass = t.getProxyUrl = void 0;
      function getProxyUrl(e) {
        const t = e.protocol === "https:";
        if (checkBypass(e)) {
          return undefined;
        }
        const r = (() => {
          if (t) {
            return process.env["https_proxy"] || process.env["HTTPS_PROXY"];
          } else {
            return process.env["http_proxy"] || process.env["HTTP_PROXY"];
          }
        })();
        if (r) {
          return new URL(r);
        } else {
          return undefined;
        }
      }
      t.getProxyUrl = getProxyUrl;
      function checkBypass(e) {
        if (!e.hostname) {
          return false;
        }
        const t = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
        if (!t) {
          return false;
        }
        let r;
        if (e.port) {
          r = Number(e.port);
        } else if (e.protocol === "http:") {
          r = 80;
        } else if (e.protocol === "https:") {
          r = 443;
        }
        const n = [e.hostname.toUpperCase()];
        if (typeof r === "number") {
          n.push(`${n[0]}:${r}`);
        }
        for (const e of t
          .split(",")
          .map((e) => e.trim().toUpperCase())
          .filter((e) => e)) {
          if (n.some((t) => t === e)) {
            return true;
          }
        }
        return false;
      }
      t.checkBypass = checkBypass;
    },
    294: (e, t, r) => {
      e.exports = r(219);
    },
    219: (e, t, r) => {
      "use strict";
      var n = r(808);
      var o = r(404);
      var i = r(685);
      var s = r(687);
      var a = r(361);
      var u = r(491);
      var l = r(837);
      t.httpOverHttp = httpOverHttp;
      t.httpsOverHttp = httpsOverHttp;
      t.httpOverHttps = httpOverHttps;
      t.httpsOverHttps = httpsOverHttps;
      function httpOverHttp(e) {
        var t = new TunnelingAgent(e);
        t.request = i.request;
        return t;
      }
      function httpsOverHttp(e) {
        var t = new TunnelingAgent(e);
        t.request = i.request;
        t.createSocket = createSecureSocket;
        t.defaultPort = 443;
        return t;
      }
      function httpOverHttps(e) {
        var t = new TunnelingAgent(e);
        t.request = s.request;
        return t;
      }
      function httpsOverHttps(e) {
        var t = new TunnelingAgent(e);
        t.request = s.request;
        t.createSocket = createSecureSocket;
        t.defaultPort = 443;
        return t;
      }
      function TunnelingAgent(e) {
        var t = this;
        t.options = e || {};
        t.proxyOptions = t.options.proxy || {};
        t.maxSockets = t.options.maxSockets || i.Agent.defaultMaxSockets;
        t.requests = [];
        t.sockets = [];
        t.on("free", function onFree(e, r, n, o) {
          var i = toOptions(r, n, o);
          for (var s = 0, a = t.requests.length; s < a; ++s) {
            var u = t.requests[s];
            if (u.host === i.host && u.port === i.port) {
              t.requests.splice(s, 1);
              u.request.onSocket(e);
              return;
            }
          }
          e.destroy();
          t.removeSocket(e);
        });
      }
      l.inherits(TunnelingAgent, a.EventEmitter);
      TunnelingAgent.prototype.addRequest = function addRequest(e, t, r, n) {
        var o = this;
        var i = mergeOptions({ request: e }, o.options, toOptions(t, r, n));
        if (o.sockets.length >= this.maxSockets) {
          o.requests.push(i);
          return;
        }
        o.createSocket(i, function (t) {
          t.on("free", onFree);
          t.on("close", onCloseOrRemove);
          t.on("agentRemove", onCloseOrRemove);
          e.onSocket(t);
          function onFree() {
            o.emit("free", t, i);
          }
          function onCloseOrRemove(e) {
            o.removeSocket(t);
            t.removeListener("free", onFree);
            t.removeListener("close", onCloseOrRemove);
            t.removeListener("agentRemove", onCloseOrRemove);
          }
        });
      };
      TunnelingAgent.prototype.createSocket = function createSocket(e, t) {
        var r = this;
        var n = {};
        r.sockets.push(n);
        var o = mergeOptions({}, r.proxyOptions, {
          method: "CONNECT",
          path: e.host + ":" + e.port,
          agent: false,
          headers: { host: e.host + ":" + e.port },
        });
        if (e.localAddress) {
          o.localAddress = e.localAddress;
        }
        if (o.proxyAuth) {
          o.headers = o.headers || {};
          o.headers["Proxy-Authorization"] =
            "Basic " + new Buffer(o.proxyAuth).toString("base64");
        }
        c("making CONNECT request");
        var i = r.request(o);
        i.useChunkedEncodingByDefault = false;
        i.once("response", onResponse);
        i.once("upgrade", onUpgrade);
        i.once("connect", onConnect);
        i.once("error", onError);
        i.end();
        function onResponse(e) {
          e.upgrade = true;
        }
        function onUpgrade(e, t, r) {
          process.nextTick(function () {
            onConnect(e, t, r);
          });
        }
        function onConnect(o, s, a) {
          i.removeAllListeners();
          s.removeAllListeners();
          if (o.statusCode !== 200) {
            c(
              "tunneling socket could not be established, statusCode=%d",
              o.statusCode
            );
            s.destroy();
            var u = new Error(
              "tunneling socket could not be established, " +
                "statusCode=" +
                o.statusCode
            );
            u.code = "ECONNRESET";
            e.request.emit("error", u);
            r.removeSocket(n);
            return;
          }
          if (a.length > 0) {
            c("got illegal response body from proxy");
            s.destroy();
            var u = new Error("got illegal response body from proxy");
            u.code = "ECONNRESET";
            e.request.emit("error", u);
            r.removeSocket(n);
            return;
          }
          c("tunneling connection has established");
          r.sockets[r.sockets.indexOf(n)] = s;
          return t(s);
        }
        function onError(t) {
          i.removeAllListeners();
          c(
            "tunneling socket could not be established, cause=%s\n",
            t.message,
            t.stack
          );
          var o = new Error(
            "tunneling socket could not be established, " + "cause=" + t.message
          );
          o.code = "ECONNRESET";
          e.request.emit("error", o);
          r.removeSocket(n);
        }
      };
      TunnelingAgent.prototype.removeSocket = function removeSocket(e) {
        var t = this.sockets.indexOf(e);
        if (t === -1) {
          return;
        }
        this.sockets.splice(t, 1);
        var r = this.requests.shift();
        if (r) {
          this.createSocket(r, function (e) {
            r.request.onSocket(e);
          });
        }
      };
      function createSecureSocket(e, t) {
        var r = this;
        TunnelingAgent.prototype.createSocket.call(r, e, function (n) {
          var i = e.request.getHeader("host");
          var s = mergeOptions({}, r.options, {
            socket: n,
            servername: i ? i.replace(/:.*$/, "") : e.host,
          });
          var a = o.connect(0, s);
          r.sockets[r.sockets.indexOf(n)] = a;
          t(a);
        });
      }
      function toOptions(e, t, r) {
        if (typeof e === "string") {
          return { host: e, port: t, localAddress: r };
        }
        return e;
      }
      function mergeOptions(e) {
        for (var t = 1, r = arguments.length; t < r; ++t) {
          var n = arguments[t];
          if (typeof n === "object") {
            var o = Object.keys(n);
            for (var i = 0, s = o.length; i < s; ++i) {
              var a = o[i];
              if (n[a] !== undefined) {
                e[a] = n[a];
              }
            }
          }
        }
        return e;
      }
      var c;
      if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
        c = function () {
          var e = Array.prototype.slice.call(arguments);
          if (typeof e[0] === "string") {
            e[0] = "TUNNEL: " + e[0];
          } else {
            e.unshift("TUNNEL:");
          }
          console.error.apply(console, e);
        };
      } else {
        c = function () {};
      }
      t.debug = c;
    },
    840: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      Object.defineProperty(t, "v1", {
        enumerable: true,
        get: function () {
          return n.default;
        },
      });
      Object.defineProperty(t, "v3", {
        enumerable: true,
        get: function () {
          return o.default;
        },
      });
      Object.defineProperty(t, "v4", {
        enumerable: true,
        get: function () {
          return i.default;
        },
      });
      Object.defineProperty(t, "v5", {
        enumerable: true,
        get: function () {
          return s.default;
        },
      });
      Object.defineProperty(t, "NIL", {
        enumerable: true,
        get: function () {
          return a.default;
        },
      });
      Object.defineProperty(t, "version", {
        enumerable: true,
        get: function () {
          return u.default;
        },
      });
      Object.defineProperty(t, "validate", {
        enumerable: true,
        get: function () {
          return l.default;
        },
      });
      Object.defineProperty(t, "stringify", {
        enumerable: true,
        get: function () {
          return c.default;
        },
      });
      Object.defineProperty(t, "parse", {
        enumerable: true,
        get: function () {
          return d.default;
        },
      });
      var n = _interopRequireDefault(r(628));
      var o = _interopRequireDefault(r(409));
      var i = _interopRequireDefault(r(122));
      var s = _interopRequireDefault(r(120));
      var a = _interopRequireDefault(r(332));
      var u = _interopRequireDefault(r(595));
      var l = _interopRequireDefault(r(900));
      var c = _interopRequireDefault(r(950));
      var d = _interopRequireDefault(r(746));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
    },
    569: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      t["default"] = void 0;
      var n = _interopRequireDefault(r(113));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function md5(e) {
        if (Array.isArray(e)) {
          e = Buffer.from(e);
        } else if (typeof e === "string") {
          e = Buffer.from(e, "utf8");
        }
        return n.default.createHash("md5").update(e).digest();
      }
      var o = md5;
      t["default"] = o;
    },
    332: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      t["default"] = void 0;
      var r = "00000000-0000-0000-0000-000000000000";
      t["default"] = r;
    },
    746: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      t["default"] = void 0;
      var n = _interopRequireDefault(r(900));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function parse(e) {
        if (!(0, n.default)(e)) {
          throw TypeError("Invalid UUID");
        }
        let t;
        const r = new Uint8Array(16);
        r[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24;
        r[1] = (t >>> 16) & 255;
        r[2] = (t >>> 8) & 255;
        r[3] = t & 255;
        r[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8;
        r[5] = t & 255;
        r[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8;
        r[7] = t & 255;
        r[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8;
        r[9] = t & 255;
        r[10] = ((t = parseInt(e.slice(24, 36), 16)) / 1099511627776) & 255;
        r[11] = (t / 4294967296) & 255;
        r[12] = (t >>> 24) & 255;
        r[13] = (t >>> 16) & 255;
        r[14] = (t >>> 8) & 255;
        r[15] = t & 255;
        return r;
      }
      var o = parse;
      t["default"] = o;
    },
    814: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      t["default"] = void 0;
      var r =
        /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
      t["default"] = r;
    },
    807: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      t["default"] = rng;
      var n = _interopRequireDefault(r(113));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      const o = new Uint8Array(256);
      let i = o.length;
      function rng() {
        if (i > o.length - 16) {
          n.default.randomFillSync(o);
          i = 0;
        }
        return o.slice(i, (i += 16));
      }
    },
    274: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      t["default"] = void 0;
      var n = _interopRequireDefault(r(113));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function sha1(e) {
        if (Array.isArray(e)) {
          e = Buffer.from(e);
        } else if (typeof e === "string") {
          e = Buffer.from(e, "utf8");
        }
        return n.default.createHash("sha1").update(e).digest();
      }
      var o = sha1;
      t["default"] = o;
    },
    950: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      t["default"] = void 0;
      var n = _interopRequireDefault(r(900));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      const o = [];
      for (let e = 0; e < 256; ++e) {
        o.push((e + 256).toString(16).substr(1));
      }
      function stringify(e, t = 0) {
        const r = (
          o[e[t + 0]] +
          o[e[t + 1]] +
          o[e[t + 2]] +
          o[e[t + 3]] +
          "-" +
          o[e[t + 4]] +
          o[e[t + 5]] +
          "-" +
          o[e[t + 6]] +
          o[e[t + 7]] +
          "-" +
          o[e[t + 8]] +
          o[e[t + 9]] +
          "-" +
          o[e[t + 10]] +
          o[e[t + 11]] +
          o[e[t + 12]] +
          o[e[t + 13]] +
          o[e[t + 14]] +
          o[e[t + 15]]
        ).toLowerCase();
        if (!(0, n.default)(r)) {
          throw TypeError("Stringified UUID is invalid");
        }
        return r;
      }
      var i = stringify;
      t["default"] = i;
    },
    628: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      t["default"] = void 0;
      var n = _interopRequireDefault(r(807));
      var o = _interopRequireDefault(r(950));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      let i;
      let s;
      let a = 0;
      let u = 0;
      function v1(e, t, r) {
        let l = (t && r) || 0;
        const c = t || new Array(16);
        e = e || {};
        let d = e.node || i;
        let f = e.clockseq !== undefined ? e.clockseq : s;
        if (d == null || f == null) {
          const t = e.random || (e.rng || n.default)();
          if (d == null) {
            d = i = [t[0] | 1, t[1], t[2], t[3], t[4], t[5]];
          }
          if (f == null) {
            f = s = ((t[6] << 8) | t[7]) & 16383;
          }
        }
        let p = e.msecs !== undefined ? e.msecs : Date.now();
        let h = e.nsecs !== undefined ? e.nsecs : u + 1;
        const v = p - a + (h - u) / 1e4;
        if (v < 0 && e.clockseq === undefined) {
          f = (f + 1) & 16383;
        }
        if ((v < 0 || p > a) && e.nsecs === undefined) {
          h = 0;
        }
        if (h >= 1e4) {
          throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        }
        a = p;
        u = h;
        s = f;
        p += 122192928e5;
        const m = ((p & 268435455) * 1e4 + h) % 4294967296;
        c[l++] = (m >>> 24) & 255;
        c[l++] = (m >>> 16) & 255;
        c[l++] = (m >>> 8) & 255;
        c[l++] = m & 255;
        const g = ((p / 4294967296) * 1e4) & 268435455;
        c[l++] = (g >>> 8) & 255;
        c[l++] = g & 255;
        c[l++] = ((g >>> 24) & 15) | 16;
        c[l++] = (g >>> 16) & 255;
        c[l++] = (f >>> 8) | 128;
        c[l++] = f & 255;
        for (let e = 0; e < 6; ++e) {
          c[l + e] = d[e];
        }
        return t || (0, o.default)(c);
      }
      var l = v1;
      t["default"] = l;
    },
    409: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      t["default"] = void 0;
      var n = _interopRequireDefault(r(998));
      var o = _interopRequireDefault(r(569));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      const i = (0, n.default)("v3", 48, o.default);
      var s = i;
      t["default"] = s;
    },
    998: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      t["default"] = _default;
      t.URL = t.DNS = void 0;
      var n = _interopRequireDefault(r(950));
      var o = _interopRequireDefault(r(746));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function stringToBytes(e) {
        e = unescape(encodeURIComponent(e));
        const t = [];
        for (let r = 0; r < e.length; ++r) {
          t.push(e.charCodeAt(r));
        }
        return t;
      }
      const i = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
      t.DNS = i;
      const s = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
      t.URL = s;
      function _default(e, t, r) {
        function generateUUID(e, i, s, a) {
          if (typeof e === "string") {
            e = stringToBytes(e);
          }
          if (typeof i === "string") {
            i = (0, o.default)(i);
          }
          if (i.length !== 16) {
            throw TypeError(
              "Namespace must be array-like (16 iterable integer values, 0-255)"
            );
          }
          let u = new Uint8Array(16 + e.length);
          u.set(i);
          u.set(e, i.length);
          u = r(u);
          u[6] = (u[6] & 15) | t;
          u[8] = (u[8] & 63) | 128;
          if (s) {
            a = a || 0;
            for (let e = 0; e < 16; ++e) {
              s[a + e] = u[e];
            }
            return s;
          }
          return (0, n.default)(u);
        }
        try {
          generateUUID.name = e;
        } catch (e) {}
        generateUUID.DNS = i;
        generateUUID.URL = s;
        return generateUUID;
      }
    },
    122: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      t["default"] = void 0;
      var n = _interopRequireDefault(r(807));
      var o = _interopRequireDefault(r(950));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function v4(e, t, r) {
        e = e || {};
        const i = e.random || (e.rng || n.default)();
        i[6] = (i[6] & 15) | 64;
        i[8] = (i[8] & 63) | 128;
        if (t) {
          r = r || 0;
          for (let e = 0; e < 16; ++e) {
            t[r + e] = i[e];
          }
          return t;
        }
        return (0, o.default)(i);
      }
      var i = v4;
      t["default"] = i;
    },
    120: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      t["default"] = void 0;
      var n = _interopRequireDefault(r(998));
      var o = _interopRequireDefault(r(274));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      const i = (0, n.default)("v5", 80, o.default);
      var s = i;
      t["default"] = s;
    },
    900: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      t["default"] = void 0;
      var n = _interopRequireDefault(r(814));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function validate(e) {
        return typeof e === "string" && n.default.test(e);
      }
      var o = validate;
      t["default"] = o;
    },
    595: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      t["default"] = void 0;
      var n = _interopRequireDefault(r(900));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function version(e) {
        if (!(0, n.default)(e)) {
          throw TypeError("Invalid UUID");
        }
        return parseInt(e.substr(14, 1), 16);
      }
      var o = version;
      t["default"] = o;
    },
    269: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, n) {
              if (n === undefined) n = r;
              var o = Object.getOwnPropertyDescriptor(t, r);
              if (
                !o ||
                ("get" in o ? !t.__esModule : o.writable || o.configurable)
              ) {
                o = {
                  enumerable: true,
                  get: function () {
                    return t[r];
                  },
                };
              }
              Object.defineProperty(e, n, o);
            }
          : function (e, t, r, n) {
              if (n === undefined) n = r;
              e[n] = t[r];
            });
      var o =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, "default", {
                enumerable: true,
                value: t,
              });
            }
          : function (e, t) {
              e["default"] = t;
            });
      var i =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var r in e)
              if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r))
                n(t, e, r);
          o(t, e);
          return t;
        };
      Object.defineProperty(t, "__esModule", { value: true });
      const s = r(393);
      const a = i(r(147));
      const u = r(186);
      try {
        const e = u.getInput("folder");
        const t = u.getInput("filename");
        var l = false;
        console.log("starting on: " + e);
        if (a.existsSync(e)) {
          l = (0, s.CreateFolder)(e, t);
        } else {
          throw { message: "Couldnt not find folder: " + e };
        }
        if (l) {
          console.log("success");
        } else {
          console.log("failure");
          u.setFailed("no pages were created");
        }
      } catch (e) {
        let t;
        if (e.message) t = e.message;
        else t = JSON.stringify(e);
        if (u) u.setFailed(t);
        else {
          console.log(t);
          process.exit(1);
        }
      }
    },
    393: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, n) {
              if (n === undefined) n = r;
              var o = Object.getOwnPropertyDescriptor(t, r);
              if (
                !o ||
                ("get" in o ? !t.__esModule : o.writable || o.configurable)
              ) {
                o = {
                  enumerable: true,
                  get: function () {
                    return t[r];
                  },
                };
              }
              Object.defineProperty(e, n, o);
            }
          : function (e, t, r, n) {
              if (n === undefined) n = r;
              e[n] = t[r];
            });
      var o =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, "default", {
                enumerable: true,
                value: t,
              });
            }
          : function (e, t) {
              e["default"] = t;
            });
      var i =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var r in e)
              if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r))
                n(t, e, r);
          o(t, e);
          return t;
        };
      var s =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: true });
      t.CreateFolder = void 0;
      const a = i(r(147));
      const u = s(r(17));
      const l = `# {$HEADER$}\n\n## Categories\n{$CATEGORIES$}\n\n## Documents\n{$DOCUMENTS$}`;
      const c = { encoding: "utf8" };
      function CreateFolder(e, t) {
        if (e.includes(".git")) return false;
        let r = [];
        let n = [];
        let o = a.readdirSync(e);
        if (o && o.length > 0) {
          for (let i = 0; i < o.length; i++) {
            const s = o[i];
            let l = u.default.join(e, s);
            if (a.statSync(l).isDirectory()) {
              if (CreateFolder(l, t)) {
                r.push(`- [${s}](./${encodeURI(s)}/${t})`);
              }
            } else {
              if (s.endsWith(".md") && s != t) {
                n.push(`- [${s.substring(0, s.length - 3)}](${encodeURI(s)})`);
              }
            }
          }
        }
        if (r.length > 0 || n.length > 0) {
          let o = u.default.join(e, t);
          let i = GetFolderName(e);
          console.log("writing: " + o);
          let s = l.replace(/\{\$HEADER\$\}/gi, i);
          s = s.replace(/\{\$CATEGORIES\$\}/gi, r.join("\r\n"));
          s = s.replace(/\{\$DOCUMENTS\$\}/gi, n.join("\r\n"));
          a.writeFileSync(o, s, c);
          return true;
        }
        return false;
      }
      t.CreateFolder = CreateFolder;
      function GetFolderName(e) {
        let t = e.lastIndexOf("/");
        if (t >= 0) {
          return e.substring(t + 1, e.length);
        }
        return e;
      }
    },
    491: (e) => {
      "use strict";
      e.exports = require("assert");
    },
    113: (e) => {
      "use strict";
      e.exports = require("crypto");
    },
    361: (e) => {
      "use strict";
      e.exports = require("events");
    },
    147: (e) => {
      "use strict";
      e.exports = require("fs");
    },
    685: (e) => {
      "use strict";
      e.exports = require("http");
    },
    687: (e) => {
      "use strict";
      e.exports = require("https");
    },
    808: (e) => {
      "use strict";
      e.exports = require("net");
    },
    37: (e) => {
      "use strict";
      e.exports = require("os");
    },
    17: (e) => {
      "use strict";
      e.exports = require("path");
    },
    404: (e) => {
      "use strict";
      e.exports = require("tls");
    },
    837: (e) => {
      "use strict";
      e.exports = require("util");
    },
  };
  var t = {};
  function __nccwpck_require__(r) {
    var n = t[r];
    if (n !== undefined) {
      return n.exports;
    }
    var o = (t[r] = { exports: {} });
    var i = true;
    try {
      e[r].call(o.exports, o, o.exports, __nccwpck_require__);
      i = false;
    } finally {
      if (i) delete t[r];
    }
    return o.exports;
  }
  if (typeof __nccwpck_require__ !== "undefined")
    __nccwpck_require__.ab = __dirname + "/";
  var r = __nccwpck_require__(269);
  module.exports = r;
})();
