const auth =require('./v1/auth.swagger')
const profile =require('./v1/profile.swagger')
const team = require('./v1/team.swagger')
export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        title: 'tingting',
        version: '1.0.4',
        description: 'tingting - API Document',
        // contact: {
        //     name: 'API Support',
        //     url: 'https://www.tingting.kr',
        //     email: 'jiyoung080912@gmail.com'
        //   },
    },
    servers: [
        {
            url: 'https://api.tingting.kr/{basePath}',
            description: 'The production API server',
            variables: {
                basePath: {
                    default: 'api/v1'
                }
            }
        },
        {
            url: 'https://13.209.81.52/{basePath}',
            description: 'The dev API server',
            variables: {
                basePath: {
                    default: 'api/v1'
                }
            }
        },
    ],
    components: {
        schemas: {},
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    paths: {
        //auth
        '/auth/local/signup': {
            post: auth.localSignup
        },
        '/auth/kakao/login(회원가입)': {
            post: auth.kakaoSignup
        },
        '/auth/kakao/login(로그인)': {
            post: auth.kakaoLogin
        },
        '/auth/local/login': {
            post: auth.localLogin
        },
        '/auth/school': {
            post: auth.checkValidityAndSendEmail
        },
        '/auth/school/confirm': {
            post: auth.confirmEmailToken
        },
        '/auth/school/complete': {
            get: auth.checkEmailAuth
        },
        '/auth/duplicate-id': {
            get: auth.checkDuplicateLocalId
        },
        '/auth/duplicate-name': {
            get: auth.checkDuplicateName
        },
        '/auth/thumbnail-img': {
            post: auth.uploadThumbnail
        },
        '/auth/find/id': {
            get: auth.checkValidityForIdAndSendEmail
        },
        '/auth/find/password': {
            get: auth.checkValidityForPasswordAndSendEmail
        },
        '/auth/find/password/complete': {
            get: auth.checkEmailAuthForPassword
        },
        '/auth/reset/password': {
            post: auth.resetPassword
        },

        //profile - 신고,차단 추후 추가
        '/me/profile ': {
            get: profile.getMyInfo
        },
        '/me/profile':{
            patch: profile.updateMyInfo
        },
        '/me/thumbnail-img': {
            patch: profile.updateMyThumbnailImg
        },
        '/me/profile-img': {
            post: profile.saveMyProfileImg
        },
        '/me/profile-img/{imgId} ': {
            patch: profile.updateMyProfileImg
        },
        '/me/profile-img/{imgId}': {
            delete: profile.deleteMyProfileImg
        },
        '/users/{id}/profile':{
            get: profile.getUserInfo
        },
        '/users/{userId}/thumbnail-img':{
            get:profile.getUserThumbnailImg
        },
        '/users/{userId}/profile-img/{imgId}':{
            get:profile.getUserProfileImg
        },

        //team
        '/teams': {
            get: team.getTeamList
        },
        '/teams ': {
            post: team.createTeam
        },
        '/teams/duplicate-name': {
            get: team.checkDuplicateTeamName
        },
        '/teams/tags': {
            get: team.getAllTags
        },
        '/teams/{id}': {
            get: team.getTeamInfo
        },
        '/me/teams/{id}': {
            get: team.getMyTeamInfo
        },
        '/me/teams/{id} ': {
            patch: team.updateMyTeam
        },
        '/me/teams/{id}/leave': {
            post: team.leaveMyTeam
        },
        '/teams/{id}/join': {
            post: team.joinTeam
        },
    }
}