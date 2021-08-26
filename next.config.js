module.exports = {
  async redirects() {
    return [
      {
        source: '/aspiration-bank',
        destination: 'https://my.aspiration.com/app/token/referral/1Q2L0EMVOQC4M927',
        permanent: true,
      },
    ]
  },
}
