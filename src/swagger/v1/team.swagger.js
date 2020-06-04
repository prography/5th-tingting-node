const getTeamList = {
  tags: ['Team'],
  description: '전체 팀 리스트 보기 ( 내가 포함된 팀은 제외)',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      in: 'query',
      name: 'limit',
      description: '한번에 보여질 리스트 수 default : 20',
      schema: {
        type: 'integer',
      },
      required: true
    },
    {
      in: 'query',
      name: 'page',
      description: '페이지 번호 default : 1',
      schema: {
        type: 'integer',
      },
      required: true
    },
    {
      in: 'header',
      name: 'Authorization',
      description: 'token',
      schema: {
        type: 'string',
      },
      required: true
    }],
  responses: {
    '200': {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              teamList: [
                {
//추가
                }
              ]
            }
          }
        }
      },
      links: {
      }
    },
    '401': {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '토큰이 유효하지 않음',
            }
          }
        }
      },
      links: {
      }
    },
    '404': {
      description: 'Not Found',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '팀이 존재하지 않습니다.',
            }
          }
        }
      },
      links: {
      }
    },
    '419': {
      description: 'Laravel error',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '토큰 만료',
            }
          }
        }
      },
      links: {
      }
    },
    '500': {
      description: 'Internal Server error',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '서버 에러',
            }
          }
        }
      },
      links: {
      }
    }
  }
}

const createTeam = {
  tags: ['Team'],
}
const checkDuplicateTeamName = {
  tags: ['Team'],
}
const getAllTags = {
  tags: ['Team'],
}
const getTeamInfo = {
  tags: ['Team'],
}
const getMyTeamInfo = {
  tags: ['Team'],
}
const updateMyTeam = {
  tags: ['Team'],
}
const leaveMyTeam = {
  tags: ['Team'],
}
const joinTeam = {
  tags: ['Team'],
}

module.exports = {
  getTeamList,
  createTeam,
  checkDuplicateTeamName,
  getAllTags,
  getTeamInfo,
  getMyTeamInfo,
  updateMyTeam,
  leaveMyTeam,
  joinTeam
}