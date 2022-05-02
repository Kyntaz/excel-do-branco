import { SessionRecord } from "../Model/Records";
import { Session } from "../Model/Session";

const DEFAULT_SHARE_SESSION_PARAM = "session";

export class UrlHandler {
    private parameter = DEFAULT_SHARE_SESSION_PARAM;
    private getWindowUrl = () => window.location.href;
    private getWindowUrlSearch = () => window.location.search;
    private setWindowUrl = (url: string) => window.location.assign(url);
    private ctrlC = (text: string) => navigator.clipboard.writeText(text);

    public getAppUrl() {
        const [appUrl] = this.getWindowUrl().split("?");
        return appUrl;
    }

    public getParameters() {
        return new URLSearchParams(this.getWindowUrlSearch());
    }

    public toShareableUrl(session: Session) {
        const queryParameters = new URLSearchParams({
            [this.parameter]: JSON.stringify(session.toRecord()),
        }).toString();

        return `${this.getAppUrl()}?${queryParameters}`
    }

    public writeShareableUrlToClipboard(session: Session) {
        const url = this.toShareableUrl(session);
        this.ctrlC(url);
    }

    public urlHasSharedSession() {
        return !!this.getParameters().get(this.parameter);
    }

    public getSharedSession() {
        const shared = this.getParameters().get(this.parameter);

        if (!shared) {
            throw new Error("No shared session");
        }

        const record: SessionRecord = JSON.parse(shared);
        return Session.fromRecord(record);
    }

    public clearSharedSession() {
        const url = this.getAppUrl();
        this.setWindowUrl(url);
    }
}
