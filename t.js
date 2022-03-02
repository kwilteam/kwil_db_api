/*const KwilDB = require('./index.js')
const fs = require('fs')
const {createFundingPool} = require('./src/fundingPools/createFundingPool.js')
const {getPool} = require('./src/fundingPools/getPool.js')
const { getGasPrice } = require('./src/fundingPools/utils.js')
const {generateAPIKey} = require('./src/utils/generateAPIKey.js')
const { sha384 } = require('./src/utils/sha384.js')

const pKey = {"kty":"RSA","n":"rjsbDmTS7H8kWf7_3Pe5vjlB--zsy4Tw5RaJu7QGR0HOdjbE7jl6ku9xpZW5wgLT7aqK1e_cAcnXFVqBApf1e1mnQF6_iANIVgaYxEhaIVtHqcg26G_oUVWYjLVN_-jQfBJoQFqpROEsY7sQrbcBGscfPtwZppVjyfJG0JOXoIbe2NuiWsAbwRHb74gnQhDjvKRi-v41vLSQnJ5-pj9QeOMDhG8N5Eiu8gl10ZssVh3-H4bWfc6DVMcQJGvoBarAiy2KeuxI_DNUMRwbDK-JTEYgoLHqS7LzrpKSlPr_hgjPRLp_gBEb8-Ajjt1Z21LHPJ30lkr_iK4Kiu56SRms_NXl-DG6UlnR2Il8GBbZDRIOdXjLS24ryM0WQ9U0JRtme-7TwJJrh3gWCcLKuQ4QeO9f6uCow8MU8E-Mc-yjUlY6vZ0skdGBNMubH_tS_XjVlxBNYdDOuNYTcmVeL9BBoNgNIoIiXFvMVb5QoM3vpAaOltPZ7BD9C0N8SBS9HjIixQ5Qx2IlzoRDMT8rXnY-iS8_6_qVU-5lZ9XrRRnGe8eM5vNVFXsoMc0qWGrmCAwGK1mHJ8kP403obBed7j5el1_Tpa07vHWhfydqt36htiWea32FYYIl_UEZQux5OKKNIaT6x11QvUZOlcW4IEtznFdbe0ZXlBwf2ONKfZF5Mm0","e":"AQAB","d":"OMvjwgl0CMxZmUzbM7k9v5kCvZE6kA3CSavTMnE5Krl1CGxKPi5WmtebgJMSfwBU_cD-iUcrvRmDF97s9196Er_jGcTJQxlu1zxHSJUdbIpJDjvKSnNQlFMG67eeubG3ZPrLKU9kpqOQyOIOSdLCdWw7703ovrksUoS8OPokD5xnwOG4R0Ugxwt_WtJTmeHPm4srCQ8djWp_Sc8REjjJjt7SIrXhHW3kOdqDodSn21rjoHtgKJrNjTFnPbg_ZrmHEtfBsNid4jkJVQkIeFYwt8CUmk3lRtALR_lX92DrM1Jj3s-9CI6LQjDq5oOZ6zlM4aHMPcItEu1JWojrLDFGhoqCQLEOEnpoh6_GeTn_WtJo9EwwIafYar8PnsRQhV0D8IGC-vHxd1_deANTyIitShou6c0j3e9cOdCYJZCiyL6VuLxu5I5nLOwWB-J-Wx951LE8iGRZRUbK6mwcqsrNoL-2wAzIZ1DezdS1hHpfAtdEAfzg_AkzyPJWr4fOX0WEfV-9Tg-cZg8OYTuj8-L-hS3TDlpDfE6DAa3EewPP1DiR8EHhOA1WpuUebnDdaeKlwHNzg1M_hPqwjwzBjjinKoHVn3iOwwDocJmz6ZXw__FEOKoEkXJqqy9FY72gkmqLIM-c0_WCd-SQmDJhte5i0ItdPQFSDkrL5C0hLSN3TrE","p":"8NAioQXyL_RfzX4V1M2FzeWWdCPsfWN6r0FnXuNaqTF1Vj_3vy2YMYu7YX3VdwQvaAZEgr2-z3Z-q0ara1lqR7icto6bl7WA_ZT6KR-VRmHmFVsfji7FCjWRDdBWfhGSq9s1Hu1oCrybV9UMRtdaPFnt7t9jGrQKtBibOjmrbb_AqJnwKc6W6gMoOg6A-KowNtXbZt4zhK79KdXofGSEvmhxD60wgxF40KRdge83ZqlbvLD4ZaBK3aYypzWtrlpUkVVppMQmQsSJ_wG_A9oDND690rLGhHFRCUjEnbxUYYbvlrT6wFjD0BtFouYn-DFK8g_gmUNR5gZs9qvn-NkYzw","q":"uTgEySJiEzSiGGCjlqLu0v88CevLXGktxPBaCtzTS4LY_wMfeTjvHaUZ4tAHuX0VbxW7T-b0zuC38mB0ePHK5e3WfGf6w4FGAOQ2fq2QY6ptN4Q8yRl8cnkRC4vZU8_1eNfFj_gUp6XEnZA5aXrFqhsMrSa3bdPVNHfte5ZL2TEWFMZAwN3ud1nd25cYXNBOqTq06rx2zwwROTbzvO9oxXxbMZ8-YLzlnO7PinIb2V9EKqpLfasG_TSjlzljSUDzqQ6u5dWJc_XQ2Sx9d1iSd2MbNf_0ZQs3lBMtaWJA3hNup99Hn9DAAQDI1rsOIfoZPgS1rbanYje58aLSs12YAw","dp":"kdbbQf2h4Nz0sDSt8ATQBhQG_CtNa9q1UDIh8ltqapEjaKqw1b09MLRZNP_KKZwFQdCZ6TwUtPwkVoIkCo1KSklJz12qaURo7CovHnycINXlTAW1pJw6hKZQRLdpykvGMgI9t487tVToF1dVagm-AlLMQCBVmrRyzwMf7zFB2uOIQBOKWSdeSjbDQ_XIsdAQBwWZLEFhnfeEJrP_amZN5irGXiIbASWxr1n7r1c6jBgBENN0e8eJz5Z5kr51guP9106M_lY0fbcdg6yBDEoaKqfcuh-_DjK6Sw8g1A5cY_weWX0dZyPa4svBbphImIzxwItREECu9snpb7JIeHKyDQ","dq":"TUmN3awmRqNY3Fk_CfWVOKBemjk1U6tj-ODegdfhp4nDKK5R7NCQHsutAJMUFheW4RKtZcsW7lihCVesYmdq5gUX0jPFVN1Vq7uO7c9ZB-2uw1K_1p526oGQVkQV_L4zTSikfM3lOIuYfrMW8efUIYZGBN65_e898TX19_MgVVIBR8vua0xwXIc4Z5AmD1yw5jbkFWttHDqJ2VkP3g_8pSOeHhe3_L_2BEU2fyvcaRkypacH9zltoizb8pd00bVzt2C0JJ21TJkPe__vnuRrwbuuOBtFDQDgQT67XVUtgj2TmCM4jPybkg-Uvt2xKQZmkBWBBirIr9hXE_iAeW4dpw","qi":"EhY9aEXNCzlAqMrtjjvzFZMWqfdNY8_ebN6POqziEF4r-CM3nbLyNnwbXxEYt73ovJ1T7lhT9iFpRsTv-qVKxNZgvY1XBwSmoB8nDDLa1YWmAJeDhS3K3SLOtHepBcsS-a1CG9773FBPdwk-ZuWgsjMENZqNMAx0B6GsY-wsKit7SSaN9R7Z6l07zhrnezIALpO_NoG1Efv7GKV4rta7B1BhX17FSMsL4vRuDAK_s7bdF03I15mEvJEH5j3eF3NjEEpw21vIO6WIlsLBWPTroXD-ujm5MJqnfP-dHLj0BJKxkwyWybRaV9bpBNwXYycr58LIc8L4yuakvzKWMS9Wvw"}
const sec = ')em}5Jx7>9GA40t_IVKw3~ryyLB?3!$)'

let devKey
let photo
if (fs.existsSync('./devKey.js')) {
    devKey = require('./devKey.js')
    //photo = fs.readFileSync('./headshot.jpg')
    //photo = photo.toString('base64')
}

const kwilDB2 = KwilDB.createConnector({
    host: 'test-db.kwil.xyz',
    protocol: 'https',
    moat: 'brennantest',
    privateKey: devKey.brennantest,
}, devKey.brennantestSecret)

const kwilDB = KwilDB.createConnector({
    host: 'localhost',
    protocol: 'http',
    port: 1984,
    moat: 'test12',
    privateKey: devKey.test10Key,
}, devKey.test10Secret)

const testF = async () => {
    //console.log(await KwilDB.createMoat('http://localhost:1984', 'test12', 'myPassword', 'myWallet'))
    //console.log(await KwilDB.createMoat('https://test-db.kwil.xyz', 'test14', 'myPassword', 'myWallet'))
    /*console.log(await kwilDB2.query(`CREATE TABLE posts(
        post_id varchar(64) NOT NULL,
        post_text varchar(300) NOT NULL,
        post_image varchar(200),
        post_author varchar(64) NOT NULL,
        referencing varchar(64),
        post_time timestamptz NOT NULL,
        post_tags varchar(32)[]
    )`))
    //await kwilDB2.query(`DELETE FROM posts WHERE post_author LIKE 'the_j_lebowski'`)
    //console.log(await kwilDB2.query(`INSERT INTO posts (post_id, post_text, post_image, post_author, referencing, post_time) VALUES ('${sha384(generateAPIKey(5))}','${postText}', 'images/posts/${generateAPIKey(32)}', '${author}', '${referencing}', to_timestamp(${time}))`))
    //console.log(await kwilDB2.query(`create schema dechat`))
    //console.log(await kwilDB2.query(`CREATE TABLE dechat.accounts(some_col varchar(5))`))
    const moatParams = {
        host:`test-db.kwil.xyz`,
        protocol: `https`,
        moat: `kwilmediumdemo`,
        privateKey: pKey
    }
    
    const myMoat = KwilDB.createConnector(moatParams, sec)

    //console.log(await myMoat.query(`CREATE TABLE test_table(test_col varchar(10))`))
    console.log(await myMoat.query(`INSERT INTO mySchema.usernames (username, wallet_address) VALUES ('brennanjl', 'Cf1cXx1wENt0XOA9wMoTWYB-rvP0jEdGS1gdQN7XkvQ')`, true))
        
    
    /*const username = 'lgruson'
    const displayName = 'Luis Gruson'
    const bio = 'Born and raised in NY, now full time business dev at Kwil'
    console.log(await kwilDB2.query(`INSERT INTO users(username, display_name, bio, pfp, banner, salt, encrypted_key, rsa_signature) VALUES ('${username}', '${displayName}', '${bio}', 'images/pfps/${username}','images/banners/${username}', '${generateAPIKey(16)}', '${generateAPIKey(4224)}', '${generateAPIKey(1024)}')`))

    //console.log(await kwilDB.query(`CREATE TABLE test_table(test_col varchar(10))`))
    //console.log(await kwilDB2.query(`DROP TABLE test_table;`))
    //console.log(await kwilDB.query('CREATE TABLE IF NOT EXISTS yuh (test_col varchar(10))', true))
    //console.log(await kwilDB2.preparedStatement('INSERT INTO yuh(test_col) VALUES ($1);', ['hi'], true))
    //console.log(await kwilDB.query('SELECT * FROM yuh;'))
    //console.log(await kwilDB.storeJPEG('test/yuh2', photo, true))
    //console.log(await KwilDB.createMoat('http://localhost:1984', 'test10', 'kwilSIG', '0xEF94BD30AA33de1677D7614D17aA39D493a485F1'))
    //console.log(await decryptKey('kwilSIG', '0xEF94BD30AA33de1677D7614D17aA39D493a485F1', 'U2FsdGVkX1+154CCJHU2FUrV7DOd1INDyidhHpf+ciebVG/s3R/uWVPh5PRy6A64L+o/n2Z19L/YUKixGRpl6A=='))
    //console.log(await kwilDB.createTable('table2' , {test: {}, username: 'varchar(100)'}))
    //kwilDB.query(`INSERT INTO testtabl3 (test_col) VALUES ('hi')`, true)
    //console.log(await createFundingPool('test123', '0xAfFDC06cF34aFD7D5801A13d48C92AD39609901D', 'goerli', 'USDC'))
}

//testF()*/