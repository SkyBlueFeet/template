import crypto from 'crypto-js';
export let p = 760123;
export const code = 'U2FsdGVkX19umHHszVFNtG1QMsD0xmxJbUPUmc2jOy8=';

export const keyArr = ['T4YuHJfKEAx', 'bDuQuqjr+GAeFpjLAtn+TWIc+yPZFeCDEjo9ielFzuhUIh7KjsnZag+RLlPQHTzepGWCfQmW14frgtAdgI8s3St7+uGfwfK6tH0Zgnx3VZwqk7X1g8bqYC14wNoWo1xotQb39KxuJoTUbLm2r+Q+pxtBWipDUJU', 'hu8ifpORlrHqf1FqcaXl3r0UbAJRrLxUboiVGHF56x7FQu4CgGp9Bp6OGhj3bDmgZfvbwXbd8JeqBIxWkZWl8SgsX', 'MM3ZKETWgBzAjAotyvQ2U9sNaz0QsqW7Vc7h8ooWTqNgTEO1V3v7oJLh2CRrSls', 'KZtN6Xmgfb8NeiVVFyHQrOX7+3lsHXiJJOTh1h+BoGQ2wGZUcMw3D3ZenDMTMMWt3aEXfA+UbkswvWK4NfwVO+gEPABJtxHPpYshXenEEk2WwsvsaCYIZaCD', '1OAsdwySaSAqrMcNF1UsesVloEmmggs', 'gATXtuE', 'WGuF', '9tCR', 'fvg6t1DiafHeQKXhmvVVVzkFJN9Vh9QiKBxPA5EghHFDLEyZbfev3Jehgl+ezklpAxLpsikICyMfyfJBXmgbV0Lkyd3lXzVDr2xcxJX2Pccs4wmiy+hT3qzrOTfxWOmhJ', '2LTuM02UMOWH8g5Mj0IB3tBYmbTisecLuSW8+gPJZKQJBMpNYq7mV6tP7caU4S+EOmEoqbwX5E3wkwVDblkE7', 'pVYB7w2pTVudP0+UoUk', 'IZt8', 'fsZjGz6uTNdi7AlfnBq0DpxM3QbMTWM', 'qg1TtSIY', 'dCRqjxmTVTc5s8892DR9gWaXVuCoO7o3TgJUOIKicpOJ6ff+iEGGLvD0KARjCt+HsrBmRCm6hmwdFfvM6cbRT4LdrOOyD00FCuzrW4BQfcBkzwSg0DkPRJuwpklf0pQ9zRTYqHvJ31zoo0si7cDmWctWl0mByOYmGzUX2IbT+8C2KKrQLNAeZapmay', '+y4KTY', 'FjAZnZ0dXtR8S2zjf9v1c9zY+5ec9fU+4jCO6CRNVz8eTMR0UxcLMvGKf1Ll89MWclSR50j4tZXhLkZBQLUbwqIK0zS8gWpCyp6y7cshf', '5pqQX0qxoB', 'Vb8Y0J15qPjwgQa1q6Ajgm++Slza79Gtrukz+8U4xAA9K6eM7g5RcbNwUDywvyZkFN+oOgq+1O4L2TuhN+kwM5gNJ7pBlby9Tg1jw5Hfp2aH1YNxf+I4AqF3qvyRcQV7Vvfrnf4dQrejxGAKKknBJsM1g1+aCw5xgjpiOlacU5o3M0vo'];

export const keyword = (() => {
    /**
     * head 私钥残片
     * body 私钥哈希,用来解密私钥
     * order 私钥序列
     */
    let arr = ['head', 'body', 'order', 'sign'];
    let o = new Object();
    arr.forEach(key => {
        o[key] = crypto.MD5(key).toString();
    });
    return o;
})();

export const TemporaryKey = 'T4YuHJfKEAx';

export const rsaKey = [760123, 618599487];