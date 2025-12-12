// Global type declarations for Node.js environment
declare var process: any;
declare var console: any;
declare var __dirname: string;
declare var __filename: string;
declare var Buffer: any;
declare var global: any;
declare function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
declare function clearTimeout(timeoutId: any): void;
declare function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
declare function clearInterval(intervalId: any): void;


declare module 'path';
declare module 'http';
declare module 'https';
declare module 'fs';
declare module 'os';
declare module 'crypto';
declare module 'util';

declare module 'express' {
    interface Request {
        [key: string]: any;
    }
    interface Response {
        [key: string]: any;
    }
    interface NextFunction {
        (err?: any): void;
    }
    interface Application {
        [key: string]: any;
    }
    const express: any;
    export = express;
    export { Request, Response, NextFunction, Application };
}

declare module 'cors' {
    const cors: any;
    export = cors;
}

declare module 'compression' {
    const compression: any;
    export = compression;
}

declare module 'helmet' {
    const helmet: any;
    export = helmet;
}

declare module 'dotenv' {
    const dotenv: any;
    export = dotenv;
}

declare module 'axios' {
    interface AxiosResponse<T = any> {
        data: T;
        status: number;
        statusText: string;
        headers: any;
        config: any;
    }

    interface AxiosRequestConfig {
        [key: string]: any;
    }

    interface AxiosStatic {
        get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
        post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
        put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
        delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
        isAxiosError(payload: any): boolean;
    }

    const axios: AxiosStatic;
    export = axios;
}