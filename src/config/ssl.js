/**
 * SSL/TLS Configuration
 */

module.exports = {
    minVersion: 'TLSv1.2',
    ciphers: [
        'ECDHE-ECDSA-AES256-GCM-SHA384',
        'ECDHE-RSA-AES256-GCM-SHA384',
        'ECDHE-ECDSA-CHACHA20-POLY1305',
        'ECDHE-RSA-CHACHA20-POLY1305'
    ],
    honorCipherOrder: true,
    ecdhCurve: 'secp384r1',
    dhparam: '/etc/ssl/certs/dhparam.pem',
    secureOptions: [
        'SSL_OP_NO_SSLv2',
        'SSL_OP_NO_SSLv3',
        'SSL_OP_NO_TLSv1',
        'SSL_OP_NO_TLSv1_1'
    ],
    secureProtocol: 'TLSv1_2_method'
};
