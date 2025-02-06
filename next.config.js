module.exports = {
    eslint: {
        ignoreDuringBuilds: true,
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },
    async rewrites() {
        return [

            //Haber
            {
                source: '/',
                destination: '/',
            },
            {
                source: '/haberler/yeni',
                destination: '/news/news.new',
            },
            {
                source: '/haberler/liste',
                destination: '/news/news.list',
            },
            {
                source: '/haberler/kategori',
                destination: '/news/news.category',
            },
            {
                source: '/haberler/analizler',
                destination: '/news/news.analitics',
            },
            {
                source: '/haberler/yorumlar',
                destination: '/news/news.comment',
            },

            //Reklam Yönetimi
            {
                source: '/reklam/yerlesim',
                destination: '/advert/ad.placement',
            },
            {
                source: '/reklam/popup',
                destination: '/advert/ad.popup',
            },
            {
                source: '/reklam/sosyal-medya',
                destination: '/advert/ad.social.media',
            },

            //Ayarlar
            {
                source: '/ayarlar/aboneler',
                destination: '/settings/sett.member',
            },
            {
                source: '/ayarlar/e-postalar',
                destination: '/settings/sett.email',
            },
            {
                source: '/ayarlar/mailchimp',
                destination: '/settings/sett.mailchimp',
            },
            {
                source: '/ayarlar/kullanicilar',
                destination: '/settings/sett.users',
            },
            {
                source: '/ayarlar/yonetim',
                destination: '/settings/sett.management',
            }

        ];
    },
};
