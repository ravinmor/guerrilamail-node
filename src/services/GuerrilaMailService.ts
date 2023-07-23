import axios from "axios"

interface GuerrilaMailInterface {
    email_addr: string;
	email_timestamp: string;
	alias: string;
	sid_token: string;
}


class GuerrilaMailApi {
    url: string;
    header: {
        Accept: string;
    }
    obj: {
        method: string;
        headers: {
            Accept: string;
        }
    }

    email_addr: string;
    email_user: string;
    email_timestamp: number;
    alias: string;
    sid_token: string;
    
    email_id: string;

    alias_error: string;
    site_id: number;
    site: string;

    auth: {
        success: boolean,
        error_codes: string[]
    }

    constructor() { 
        this.url = `http://api.guerrillamail.com/ajax.php?`;
        this.header = {
            Accept: 'application/json'
        }
        this.obj = {
            method: 'GET',
            headers: this.header,
        }

        this.get_email_address();
    }

    async get_email_address(): Promise<GuerrilaMailInterface> {
        const params = {
            f: 'get_email_address'
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
                
            });

        this.email_addr = emailData.email_addr;
        this.email_user = emailData.email_addr.split('@')[0];
        this.email_timestamp = emailData.email_timestamp;
        this.alias = emailData.alias;
        this.sid_token = emailData.sid_token;

        return emailData;
    }

    async set_email_user(email_user = this.email_user): Promise<GuerrilaMailInterface> {
        const params = {
            f: 'set_email_user',
            ip: '127.0.0.1',
            agent: 'Mozilla_foo_bar',
            lang: 'en',
            email_user: email_user,
            sid_token: this.sid_token,
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
                
            });

        // this.alias_error = emailData.alias_error;

        this.alias = emailData.alias;

        this.email_addr = emailData.email_addr;
        this.email_timestamp = emailData.email_timestamp;

        this.site_id = emailData.site_id;
        this.sid_token = emailData.sid_token;

        this.site = emailData.site;

        // this.auth.success = emailData.auth.success;
        // this.auth.error_codes = emailData.auth.error_codes;

        return emailData;
    }

    async check_email(sequency = 1): Promise<GuerrilaMailInterface> {
        const params = {
            f: 'check_email',
            ip: '127.0.0.1',
            agent: 'Mozilla_foo_bar',
            seq: sequency,
            sid_token: this.sid_token,
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
                
            });

        return emailData;
    }

    async get_email_list(sequency = "", limit = 20): Promise<any> {
        const params = {
            f: 'get_email_list',
            ip: '127.0.0.1',
            agent: 'Mozilla_foo_bar',
            seq: sequency,
            offset: limit,
            sid_token: this.sid_token,
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
                
            });

        return emailData;
    }

    async fetch_email(email_id: number): Promise<any>  {
        const params = {
            f: 'fetch_email',
            ip: '127.0.0.1',
            agent: 'Mozilla_foo_bar',
            sid_token: this.sid_token,
            email_id: email_id
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
                
            });

        return emailData;
    }

    async forget_me(): Promise<boolean>  {
        const params = {
            f: 'forget_me',
            ip: '127.0.0.1',
            agent: 'Mozilla_foo_bar',
            sid_token: this.sid_token,
            email_addr: this.email_addr
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
                
            });

        return emailData;
    }

    async del_email(email_ids: number[]): Promise<boolean>  {
        const params = {
            f: 'del_email',
            ip: '127.0.0.1',
            agent: 'Mozilla_foo_bar',
            sid_token: this.sid_token,
            email_ids: email_ids
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
                
            });

        return emailData;
    }

    async get_older_list(sequency = "", limit = 20): Promise<boolean>  {
        const params = {
            f: 'get_older_list',
            ip: '127.0.0.1',
            agent: 'Mozilla_foo_bar',
            sid_token: this.sid_token,
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

}

export default GuerrilaMailApi;