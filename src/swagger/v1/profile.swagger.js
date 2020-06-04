const getMyInfo = {
  tags: ['Profile'],
  description: '내 정보 보기',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [{
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
            type: 'object',
            properties: {
              data: {
                myInfo: {
                  id: {
                    description: '회원 Id(DB)',
                    type: 'string',
                    example: '24'
                  },
                  name: {
                    description: '이름(닉네임)',
                    type: 'string',
                    example: '팅자탱자'
                  },
                  birth: {
                    description: '생년월일',
                    type: 'string',
                    format: 'date',
                    example: '1998-08-10'
                  },
                  height: {
                    description: '키',
                    type: 'integer',
                    example: '193'
                  },
                }
              },
              id: {
                description: '회원 Id(DB)',
                type: 'string',
                example: '24'
              },
              name: {
                description: '이름(닉네임)',
                type: 'string',
                example: '팅자탱자'
              },
              birth: {
                description: '생년월일',
                type: 'string',
                format: 'date',
                example: '1998-08-10'
              },
              height: {
                description: '키',
                type: 'integer',
                example: '193'
              },
            }
          },
          example: {
            data: {
              myInfo: {
                id: 24,
                name: '팅자탱자',
                birth: '1998-08-10',
                height: 193,
                thumbnail: 'http://13.209.81.52/api/v1/users/24/thumbnail-img',
                gender: 1,
                schoolName: '팅코벨팅자탱자',
                profileImgIds: [1, 2]
              },
              myTeamList: [
                {
                  id: 36,
                  name: '팅코벨',
                  max_member_number: 2,
                  is_ready: 'true'
                }
              ],
              sentMatchings: [
                {
                  id: 12,
                  created_at: '2019-10-05',
                  sendTeam: {
                    id: 36,
                    name: '팅코벨(사용자 팀)'
                  },
                  receiveTeam: {
                    id: 48,
                    name: '체고체고(상대 팀)'
                  }
                },
                {
                  id: 15,
                  created_at: '2019-10-05',
                  sendTeam: {
                    id: 36,
                    name: '팅코벨(사용자 팀)'
                  },
                  receiveTeam: {
                    id: 60,
                    name: '룰루랄라(상대 팀)'
                  }
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
const updateMyInfo = {
  tags: ['Profile'],
  description: '내 정보 수정하기 //현재 키만 수정 가능',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [{
    in: 'header',
    name: 'Authorization',
    description: 'token',
    schema: {
      type: 'string',
    },
    required: true
  }],
  requestBody: {
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            name: {
              description: '변경하고자 하는 닉네임',
              type: 'string',
              example: '팅팅탱탱'
            },
            height: {
              description: '변경하고자 하는 키',
              type: 'integer',
              example: '199'
            },
            thumbnail: {
              description: '변경하고자 하는 사진',
              type: 'string',
              example: 'https://tt.s3.amazonaws.com/tingting.png'
            }
          },
          required: [
            'height',]
        }
      }
    }
  },
  responses: {
    '201': {
      description: 'Created',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              message: '내 정보 수정에 성공했습니다.'
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
const updateMyThumbnailImg = {
  tags: ['Profile'],
  description: '내 대표사진(썸네일) 수정',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [{
    in: 'header',
    name: 'Authorization',
    description: 'token',
    schema: {
      type: 'string',
    },
    required: true
  }],
  requestBody: {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            thumbnail: {
              description: '변경하고자 하는 사진',
              type: 'string',
              format: 'file',
              example: 'tingting.png'
            }
          },
          required: ['thumbnail',]
        }
      }
    }
  },
  responses: {
    '201': {
      description: 'Created',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              message: '이미지 수정에 성공했습니다.'
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
const saveMyProfileImg = {
  tags: ['Profile'],
  description: '내 서브(프로필) 이미지 저장',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [{
    in: 'header',
    name: 'Authorization',
    description: 'token',
    schema: {
      type: 'string',
    },
    required: true
  }],
  requestBody: {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            profileImg: {
              description: '등록하고자 하는 사진',
              type: 'string',
              format: 'file',
              example: 'tingting.png'
            }
          },
          required: ['profileImg',]
        }
      }
    }
  },
  responses: {
    '201': {
      description: 'Created',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              message: '이미지 저장에 성공하였습니다.'
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
              errorMessage: '이미지 저장에 실패하였습니다.',
            }
          }
        }
      },
      links: {
      }
    }
  }
}
const updateMyProfileImg = {
  tags: ['Profile'],
  description: '내 서브(프로필) 이미지 수정',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      in: 'path',
      name: 'imgId',
      description: '이미지 Id(DB)',
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
  requestBody: {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            profileImg: {
              description: '변경하고자 하는 사진',
              type: 'string',
              format: 'file',
              example: 'tingting.png'
            }
          },
          required: ['profileImg',]
        }
      }
    }
  },
  responses: {
    '201': {
      description: 'Created',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              message: '이미지 수정에 성공했습니다.'
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
const deleteMyProfileImg = {
  tags: ['Profile'],
  description: '내 서브(프로필) 이미지 삭제',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      in: 'path',
      name: 'imgId',
      description: '이미지 Id(DB)',
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
    '201': {
      description: 'Created',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              message: '이미지 삭제에 성공했습니다.'
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
const getUserInfo = {
  tags: ['Profile'],
  description: '다른 사용자 정보 보기',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      in: 'path',
      name: 'id',
      description: '다른 사용자 Id(DB)',
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
            id: {
              description: '회원 Id(DB)',
              type: 'string',
            },
            name: {
              description: '이름(닉네임)',
              type: 'string',
            },
            birth: {
              description: '생년월일',
              type: 'string',
              format: 'date',
            },
            height: {
              description: '키',
              type: 'integer',
            },
            thumbnail: {
              description: '대표사진 보기 API',
              type: 'string'
            },
            gender: {
              description: '성별 (0/1)',
              type: 'integer',
            },
            SchoolName: {
              description: '대학교 이름',
              type: 'string'
            },
            profileImgIds: {
              description: '서브(프로필) 이미지 ID(DB)',
              type: 'array'
            },
          },
          example: {
            data: {
              userInfo: {
                id: 12,
                name: '하부장',
                birth: '1998-08-10',
                height: 180,
                thumbnail: 'http://13.209.81.52/api/v1/users/24/thumbnail-img',
                gender: 1,
                SchoolName: '팅팅',
                profileImgIds: [12, 24]
              }
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
              errorMessage: '사용자가 존재하지 않음',
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
const getUserThumbnailImg = {
  tags: ['Profile'],
  description: '사용자 대표사진(썸네일) 보기',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      in: 'path',
      name: 'userId',
      description: '사용자 Id(DB)',
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
              errorMessage: '사진이 존재하지 않음',
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
              errorMessage: '사진 불러오기 실패',
            }
          }
        }
      },
      links: {
      }
    }
  }
}
const getUserProfileImg = {
  tags: ['Profile'],
  description: '사용자 서브(프로필) 사진 보기',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      in: 'path',
      name: 'userId',
      description: '사용자 Id(DB)',
      schema: {
        type: 'integer',
      },
      required: true
    },
    {
      in: 'path',
      name: 'imgId',
      description: '이미지 Id(DB)',
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
              errorMessage: '사진이 존재하지 않음',
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
              errorMessage: '사진 불러오기 실패',
            }
          }
        }
      },
      links: {
      }
    }
  }
}

module.exports = {
  getMyInfo,
  updateMyInfo,
  updateMyThumbnailImg,
  saveMyProfileImg,
  updateMyProfileImg,
  deleteMyProfileImg,
  getUserInfo,
  getUserThumbnailImg,
  getUserProfileImg
}


