const localSignup = {
  tags: ['Auth'],
  description: '로컬 회원가입',
  requestBody: {
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            local_id: {
              description: '로컬 아이디',
              type: 'string',
              example: 'tingting'
            },
            password: {
              description: '비밀번호',
              type: 'string',
              example: 'tingting123'
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
            authenticated_address: {
              description: '학교 이메일',
              type: 'string',
              example: 'tingting@tingting.ac.kr'
            },
            gender: {
              description: '성별(남자 0/여자 1)',
              type: 'integer',
              example: '1'
            }
          },
          required: [
            'local_id',
            'password',
            'name',
            'birth',
            'height',
            'authenticated_address',
            'gender']
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Created',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              message: '회원가입에 성공했습니다. 이미지를 추가해주세요.',
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6MjV9LCJpYXQiOjE1NzgwNTY5NTYsImV4cCI6MTU4MTY1Njk1NiwiaXNzIjoidGluZ3RpbmcifQ.hWvXuNK2qSNM6po7wjEL3hkgPqnPDwPXLQP8x-gpuLw'
            }
          }
        }
      },
      links: {
      }
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            errorType1: {
              data: {
                errorMessage: '이미 가입된 사용자입니다.'
              }
            },
            errorType2: {
              data: {
                errorMessage: '만 18세 미만으로 가입할 수 없습니다.'
              }
            }
          }
        }
      },
      links: {
      }
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '인증된 이메일이 아닙니다.'
            }
          }
        }
      },
      links: {
      }
    },
    500: {
      description: 'Internal Server error',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '회원가입에 실패하였습니다.'
            }
          }
        }
      },
      links: {
      }
    }
  }
}

const kakaoSignup = {
  tags: ['Auth'],
  description: '소셜(카카오) 회원가입',
  // security: [
  //     {
  //         bearerAuth: []
  //     }
  // ],
  parameters: [{
    in: 'header',
    name: 'Authorization',
    description: 'kakaoId',
    schema: {
      type: 'string'
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
            authenticated_address: {
              description: '학교 이메일',
              type: 'string',
              example: 'tingting@tingting.ac.kr'
            },
            gender: {
              description: '성별(남자 0/여자 1)',
              type: 'integer',
              example: '1'
            }
          },
          required: [
            'name',
            'birth',
            'height',
            'authenticated_address',
            'gender']
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Created',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              message: '회원가입에 성공했습니다. 이미지를 추가해주세요.',
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6MjV9LCJpYXQiOjE1NzgwNTY5NTYsImV4cCI6MTU4MTY1Njk1NiwiaXNzIjoidGluZ3RpbmcifQ.hWvXuNK2qSNM6po7wjEL3hkgPqnPDwPXLQP8x-gpuLw'
            }
          }
        }
      },
      links: {
      }
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '만 18세 미만으로 가입할 수 없습니다.'
            }
          }
        }
      },
      links: {
      }
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            errorType1: {
              data: {
                errorMessage: '유효하지 않은 토큰입니다.'
              }
            },
            errorType2: {
              data: {
                errorMessage: '인증된 이메일이 아닙니다.'
              }
            }
          }
        }
      },
      links: {
      }
    },
    500: {
      description: 'Internal Server error',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '로그인 혹은 회원가입에 실패했습니다.'
            }
          }
        }
      },
      links: {
      }
    }
  }
}
const kakaoLogin = {
  tags: ['Auth'],
  description: '소셜(카카오) 로그인',
  parameters: [{
    in: 'header',
    name: 'Authorization',
    description: 'kakaoId',
    schema: {
      type: 'string'
    },
    required: true
  }],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              message: '로그인에 성공했습니다.',
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6MjV9LCJpYXQiOjE1NzgwNTY5NTYsImV4cCI6MTU4MTY1Njk1NiwiaXNzIjoidGluZ3RpbmcifQ.hWvXuNK2qSNM6po7wjEL3hkgPqnPDwPXLQP8x-gpuLw'
            }
          }
        }
      },
      links: {
      }
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '유효하지 않은 토큰입니다.'
            }
          }
        }
      },
      links: {
      }
    },
    500: {
      description: 'Internal Server error',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '로그인 혹은 회원가입에 실패했습니다.'
            }
          }
        }
      },
      links: {
      }
    }
  }
}
const localLogin = {
  tags: ['Auth'],
  description: '로컬 로그인',
  requestBody: {
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            local_id: {
              description: '로컬 아이디',
              type: 'string',
              example: 'tingting'
            },
            password: {
              description: '비밀번호',
              type: 'string',
              example: 'tingting123'
            }
          },
          required: [
            'local_id',
            'password']
        }
      }
    }
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              message: '로그인에 성공했습니다. & 토큰이 발행되었습니다.',
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6MjV9LCJpYXQiOjE1NzgwNTY5NTYsImV4cCI6MTU4MTY1Njk1NiwiaXNzIjoidGluZ3RpbmcifQ.hWvXuNK2qSNM6po7wjEL3hkgPqnPDwPXLQP8x-gpuLw'
            }
          }
        }
      },
      links: {
      }
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            errorType1: {
              data: {
                errorMessage: '아이디와 비밀번호를 입력해주세요!'
              }
            },
            errorType2: {
              data: {
                errorMessage: '존재하지 않는 아이디입니다.'
              }
            }
          }
        }
      },
      links: {
      }
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '비밀번호가 틀렸습니다.'
            }
          }
        }
      },
      links: {
      }
    },
    500: {
      description: 'Internal Server error',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '로그인에 실패했습니다.'
            }
          }
        }
      },
      links: {
      }
    }
  }
}
const checkValidityAndSendEmail = {
  tags: ['Auth'],
  description: '학교 인증1 (앱에서 인증하기 버튼을 눌렀을 시)',
  requestBody: {
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            email: {
              description: '학교 이메일',
              type: 'string',
              example: 'tingkobel@tingjataengja.ac.kr'
            }
          },
          required: ['email']
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Created',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              message: '인증메일을 전송했습니다.'
            }
          }
        }
      },
      links: {
      }
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '이미 가입된 이메일입니다.'
            }
          }
        }
      },
      links: {
      }
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '가입이 불가능한 이메일입니다.'
            }
          }
        }
      },
      links: {
      }
    },
    500: {
      description: 'Internal Server error',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '서버 에러'
            }
          }
        }
      },
      links: {
      }
    }
  }
}
const confirmEmailToken = {
  tags: ['Auth'],
  description: '학교 인증2 (서버 API)',
  parameters: [{
    in: 'query',
    name: 'token',
    description: 'token',
    schema: {
      type: 'string'
    },
    required: true
  }],
  responses: {
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '토큰이 유효하지 않음'
            }
          }
        }
      },
      links: {
      }
    },
    419: {
      description: 'Laravel error',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '토큰 만료'
            }
          }
        }
      },
      links: {
      }
    },
    500: {
      description: 'Internal Server error',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '서버 에러'
            }
          }
        }
      },
      links: {
      }
    }
  }
}
const checkEmailAuth = {
  tags: ['Auth'],
  description: '학교 인증3 (학교 이메일에서 "인증하기" 버튼 클릭 후에  앱에서 다음으로 넘어갈 때, 인증 완료되었는지 다시 체크!)',
  requestBody: {
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            email: {
              description: '학교 이메일',
              type: 'string',
              example: 'tingkobel@tingjataengja.ac.kr'
            }
          },
          required: ['email']
        }
      }
    }
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              message: '인증이 완료된 이메일입니다.'
            }
          }
        }
      },
      links: {
      }
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '인증이 필요한 이메일입니다.'
            }
          }
        }
      },
      links: {
      }
    },
    500: {
      description: 'Internal Server error',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '서버 에러'
            }
          }
        }
      },
      links: {
      }
    }
  }
}
const checkDuplicateLocalId = {
  tags: ['Auth'],
  description: '아이디(로컬아이디) 중복확인',
  parameters: [{
    in: 'query',
    name: 'local_id',
    description: 'local Id',
    schema: {
      type: 'string'
    },
    required: true
  }],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              message: '사용 가능한 아이디입니다.'
            }
          }
        }
      },
      links: {
      }
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '이미 존재하는 아이디입니다.'
            }
          }
        }
      },
      links: {
      }
    }
  }
}
const checkDuplicateName = {
  tags: ['Auth'],
  description: '이름(닉네임) 중복확인',
  parameters: [{
    in: 'query',
    name: 'name',
    description: '이름(닉네임)',
    schema: {
      type: 'string'
    },
    required: true
  }],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              message: '사용 가능한 이름입니다.'
            }
          }
        }
      },
      links: {
      }
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '이미 존재하는 이름입니다.'
            }
          }
        }
      },
      links: {
      }
    }
  }
}

const uploadThumbnail = {
  tags: ['Auth'],
  description: '사용자 대표사진 등록 ',
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
      type: 'string'
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
              description: '사용자 대표 사진 (얼굴이 나타난 사진)',
              type: 'string',
              format: 'file',
              example: 'tingkobeltingjataengja.jpeg'
            }
          },
          required: ['thumbnail']
        }
      }
    },
    responses: {
      201: {
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
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: {
            },
            example: {
              data: {
                errorMessage: '토큰이 유효하지 않음'
              }
            }
          }
        },
        links: {
        }
      },
      419: {
        description: 'Laravel error',
        content: {
          'application/json': {
            schema: {
            },
            example: {
              data: {
                errorMessage: '토큰 만료'
              }
            }
          }
        },
        links: {
        }
      },
      500: {
        description: 'Internal Server error',
        content: {
          'application/json': {
            schema: {
            },
            example: {
              data: {
                errorMessage: '이미지 저장에 실패하였습니다.'
              }
            }
          }
        },
        links: {
        }
      }
    }
  }
}
const checkValidityForIdAndSendEmail = {
  tags: ['Auth'],
  description: '아이디 찾기',
  parameters: [{
    in: 'query',
    name: 'email',
    description: '가입한 학교 이메일',
    schema: {
      type: 'string'
    },
    required: true
  }],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              message: '아이디 찾기 메일을 전송했습니다.'
            }
          }
        }
      },
      links: {
      }
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '존재하지 않는 이메일입니다.'
            }
          }
        }
      },
      links: {
      }
    },
    description: 'Internal Server error',
    content: {
      'application/json': {
        schema: {
        },
        example: {
          data: {
            errorMessage: '서버 에러'
          }
        }
      }
    },
    links: {
    }
  }
}
const checkValidityForPasswordAndSendEmail = {
  tags: ['Auth'],
  description: '비밀번호 찾기',
  parameters: [{
    in: 'query',
    name: 'localId',
    description: '가입한 로컬 아이디',
    schema: {
      type: 'string'
    },
    required: true
  },
  {
    in: 'query',
    name: 'email',
    description: '가입한 학교 이메일',
    schema: {
      type: 'string'
    },
    required: true
  }],
  responses: {
    201: {
      description: 'Created',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              code: 'pYb2YY+zKHdVLQV+9X/aOL85w6oqRmDGEjN6tpSgcNFQ9WWOlK152rpuGlQafxw2/S/QdVvjwe9t4UzBAikhGg=='
            }
          }
        }
      },
      links: {
      }
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '잘못된 아이디 또는 이메일입니다.'
            }
          }
        }
      },
      links: {
      }
    },
    500: {
      description: 'Internal Server error',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '서버 에러'
            }
          }
        }
      },
      links: {
      }
    }
  }
}
const checkEmailAuthForPassword = {
  tags: ['Auth'],
  description: '비밀번호 찾기 - 확인',
  parameters: [{
    in: 'header',
    name: 'Authorization',
    description: 'code',
    schema: {
      type: 'string'
    },
    required: true
  }],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              message: '인증이 완료된 이메일입니다.'
            }
          }
        }
      },
      links: {
      }
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '인증이 필요한 이메일입니다.'
            }
          }
        }
      },
      links: {
      }
    },
    500: {
      description: 'Internal Server error',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '서버 에러'
            }
          }
        }
      },
      links: {
      }
    }
  }
}
const resetPassword = {
  tags: ['Auth'],
  description: '비밀번호 재설정',
  parameters: [{
    in: 'header',
    name: 'Authorization',
    description: 'code',
    schema: {
      type: 'string'
    },
    required: true
  }],
  requestBody: {
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            email: {
              description: '가입한 학교 이메일',
              type: 'string',
              example: 'tingkobel@tingjataengja.ac.kr'
            },
            password: {
              description: '비밀번호',
              type: 'string',
              example: 'tingting123'
            }
          },
          required: [
            'email',
            'password']
        }
      }
    }
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              message: '비밀번호를 재설정하였습니다.'
            }
          }
        }
      },
      links: {
      }
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '인증이 필요한 이메일입니다.'
            }
          }
        }
      },
      links: {
      }
    },
    500: {
      description: 'Internal Server error',
      content: {
        'application/json': {
          schema: {
          },
          example: {
            data: {
              errorMessage: '서버 에러'
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
  localSignup,
  kakaoSignup,
  kakaoLogin,
  localLogin,
  checkValidityAndSendEmail,
  confirmEmailToken,
  checkEmailAuth,
  checkDuplicateLocalId,
  checkDuplicateName,
  uploadThumbnail,
  checkValidityForIdAndSendEmail,
  checkValidityForPasswordAndSendEmail,
  checkEmailAuthForPassword,
  resetPassword
}
