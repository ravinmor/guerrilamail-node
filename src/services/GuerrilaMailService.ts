import axios from "axios"

interface GuerrilaMailInterface {
    email_addr: string;
	email_timestamp: number;
	alias: string;
	sid_token: string;
}

interface GuerrillaMailOptionsInterface {
    ip?: string;
    agent?: string;
    lang?: string;
}

class GuerrilaMailApi {
    private url: string;
    public email_addr: string;
    public email_user: string;
    public email_timestamp: number;
    public alias: string;
    public sid_token: string;
    public email_id: string;
    public alias_error: string;

    public params: {
        ip: string;
        agent: string;
        lang: string;
    }

    // Always when start this class the email should create his own 
    // ip, agent, email, email_timestamp, alias and sid_token
    constructor(private options: GuerrillaMailOptionsInterface = {}) { 
        this.url = `http://api.guerrillamail.com/ajax.php?`;

        this.params = {
            ip: options.ip || this.randomIp(),
            agent: options.agent || this.randomAgent(),
            lang: options.lang || "en"
        }
        
    }

    async get_email_address(): Promise<GuerrilaMailInterface> {
        const params = {
            ... this.params,
            f: 'get_email_address'
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
            });

        this.email_addr      = emailData.email_addr;
        this.email_user      = emailData.email_addr.split('@')[0];
        this.email_timestamp = emailData.email_timestamp;
        this.alias           = emailData.alias;
        this.sid_token       = emailData.sid_token;

        return emailData;
    }

    async set_email_user(sid_token: string, email_user = this.email_user): Promise<GuerrilaMailInterface> {
        const params = {
            ... this.params,
            f: 'set_email_user',
            sid_token: sid_token,
            email_user: email_user,
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
            });

        this.alias           = emailData.alias;
        this.email_addr      = emailData.email_addr;
        this.email_timestamp = emailData.email_timestamp;
        this.sid_token       = emailData.sid_token;

        return emailData;
    }

    async check_email(sid_token: string, sequency: number = 1): Promise<GuerrilaMailInterface> {
        const params = {
            ... this.params,
            f: 'check_email',
            seq: sequency,
            sid_token: sid_token,
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
            });

        return emailData;
    }

    async get_email_list(sid_token: string, sequency = "", limit = 20): Promise<any> {
        const params = {
            ... this.params,
            f: 'get_email_list',
            sid_token: sid_token,
            seq: sequency,
            offset: limit,
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
            });

        return emailData;
    }

    async fetch_email(sid_token: string, email_id: number): Promise<any>  {
        const params = {
            ... this.params,
            f: 'fetch_email',
            sid_token: sid_token,
            email_id: email_id
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
            });

        return emailData;
    }

    async forget_me(sid_token: string, email_addr: string): Promise<boolean>  {
        const params = {
            ... this.params,
            f: 'forget_me',
            sid_token: sid_token,
            email_addr: email_addr
        };

        const emailData = await axios.delete(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
            });

        return emailData;
    }

    async del_email(sid_token: string, email_ids: number[]): Promise<boolean>  {
        const params = {
            ... this.params,
            f: 'del_email',
            sid_token: sid_token,
            email_ids: email_ids
        };

        const emailData = await axios.delete(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
            });

        return emailData;
    }

    async get_older_list(sid_token: string, sequency = "", limit = 20): Promise<boolean>  {
        const params = {
            ... this.params,
            f: 'get_older_list',
            sid_token: sid_token,
            seq: sequency,
            limit: limit
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err); 
            });

        return emailData;
    }

    remaining_minutes() {}

    private randomAgent(): string {
        return "Mozilla_foo_bar"
    }

    private randomIp(): string {
        return "127.0.0.1"
    }

}

export default GuerrilaMailApi;