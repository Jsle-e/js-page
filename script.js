// 당첨 애니메이션 표시
function showWinnerAnimation() {
    // 색종이 효과 먼저 실행
    createMegaConfetti();
    
    // 1초 후에 당첨 모달 표시
    setTimeout(() => {
        document.getElementById('winnerModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // 당첨 사운드 효과 (선택사항)
        playWinnerSound();
    }, 1000);
}

// 계좌 입력 폼 표시
function showAccountForm() {
    document.getElementById('winnerModal').style.display = 'none';
    document.getElementById('accountFormModal').style.display = 'block';
}

// 계좌 입력 폼 닫기
function closeAccountFormModal() {
    document.getElementById('accountFormModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 선물 처리
function processGift() {
    const bankSelect = document.getElementById('bankSelect').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const accountHolder = document.getElementById('accountHolder').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    
    // 입력 유효성 검사
    if (!bankSelect || !accountNumber || !accountHolder || !phoneNumber) {
        alert('모든 정보를 입력해주세요!');
        return;
    }
    
    // 계좌번호 형식 검사
    if (accountNumber.length < 10) {
        alert('올바른 계좌번호를 입력해주세요!');
        return;
    }
    
    // 휴대폰 번호 형식 검사
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(phoneNumber)) {
        alert('휴대폰 번호를 010-1234-5678 형식으로 입력해주세요!');
        return;
    }
    
    // 처리 중 모달 표시
    document.getElementById('accountFormModal').style.display = 'none';
    document.getElementById('processingModal').style.display = 'block';
    
    // 본인 확인 시뮬레이션 (3초)
    setTimeout(() => {
        document.getElementById('processingModal').style.display = 'none';
        showCompletionModal(bankSelect, accountNumber, accountHolder);
    }, 3000);
}

// 완료 모달 표시
function showCompletionModal(bank, account, holder) {
    const bankNames = {
        'kb': 'KB국민은행',
        'shinhan': '신한은행',
        'woori': '우리은행',
        'hana': '하나은행',
        'nh': 'NH농협은행',
        'kakao': '카카오뱅크',
        'toss': '토스뱅크',
        'kbank': '케이뱅크',
        'sc': 'SC제일은행',
        'city': '씨티은행'
    };
    
    const bankName = bankNames[bank] || bank;
    const maskedAccount = account.slice(0, -4) + '****';
    
    document.getElementById('finalAccountInfo').textContent = `${bankName} ${maskedAccount} (${holder})`;
    document.getElementById('completionModal').style.display = 'block';
    
    // 완료 효과
    createCelebrationEffect();
}

// 모든 모달 닫기
function closeAllModals() {
    document.getElementById('winnerModal').style.display = 'none';
    document.getElementById('accountFormModal').style.display = 'none';
    document.getElementById('processingModal').style.display = 'none';
    document.getElementById('completionModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 메가 색종이 효과
function createMegaConfetti() {
    const confettiColors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#ffd700', '#ff6348', '#2ed573'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
            
            document.body.appendChild(confetti);
            
            // 떨어지는 애니메이션
            confetti.animate([
                {
                    transform: 'translateY(-20px) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = function() {
                confetti.remove();
            };
        }, i * 10);
    }
}

// 축하 효과
function createCelebrationEffect() {
    // 화면 전체에 반짝이는 효과
    const celebration = document.createElement('div');
    celebration.style.position = 'fixed';
    celebration.style.top = '0';
    celebration.style.left = '0';
    celebration.style.width = '100vw';
    celebration.style.height = '100vh';
    celebration.style.background = 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)';
    celebration.style.pointerEvents = 'none';
    celebration.style.zIndex = '9998';
    celebration.style.animation = 'celebrationPulse 2s ease-in-out';
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        celebration.remove();
    }, 2000);
    
    // 추가 CSS for celebration animation
    if (!document.querySelector('#celebrationStyle')) {
        const style = document.createElement('style');
        style.id = 'celebrationStyle';
        style.textContent = `
            @keyframes celebrationPulse {
                0%, 100% { opacity: 0; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// 당첨 사운드 효과 (선택사항)
function playWinnerSound() {
    // 실제 사운드 파일이 있다면 여기서 재생
    // const audio = new Audio('winner-sound.mp3');
    // audio.play().catch(e => console.log('Sound play failed:', e));
    
    // 진동 효과 (모바일)
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 200]);
    }
}

// 기존 함수들 제거 또는 수정
function showGiftOptions() {
    // 이 함수는 더 이상 사용하지 않음
    showWinnerAnimation();
}

function closeGiftModal() {
    // 호환성을 위해 유지
    closeAllModals();
}

function closeAccountModal() {
    // 호환성을 위해 유지
    closeAllModals();
}

// 나머지 기존 함수들은 그대로 유지

// 모달 외부 클릭시 닫기
window.onclick = function(event) {
    const winnerModal = document.getElementById('winnerModal');
    const accountFormModal = document.getElementById('accountFormModal');
    const processingModal = document.getElementById('processingModal');
    const completionModal = document.getElementById('completionModal');
    
    if (event.target === winnerModal) {
        // 당첨 모달은 외부 클릭으로 닫지 않음 (중요한 정보이므로)
        return;
    }
    if (event.target === accountFormModal) {
        closeAccountFormModal();
    }
    if (event.target === processingModal) {
        // 처리 중일 때는 닫지 않음
        return;
    }
    if (event.target === completionModal) {
        closeAllModals();
    }
}

// 부드러운 스크롤 효과
document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 인디케이터 클릭시 부드럽게 스크롤
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const gallerySection = document.querySelector('.gallery');
            gallerySection.scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
    
    // 페이지 로드시 애니메이션 효과
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 키보드 이벤트 (ESC 키로 모달 닫기)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // 처리 중이거나 당첨 모달일 때는 ESC로 닫지 않음
        const processingModal = document.getElementById('processingModal');
        const winnerModal = document.getElementById('winnerModal');
        
        if (processingModal.style.display === 'block' || winnerModal.style.display === 'block') {
            return;
        }
        
        closeAllModals();
    }
});

// 입력 필드 자동 포맷팅
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phoneNumber');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 3) {
                value = value.substring(0, 3) + '-' + value.substring(3);
            }
            if (value.length >= 8) {
                value = value.substring(0, 8) + '-' + value.substring(8, 12);
            }
            e.target.value = value;
        });
    }
    
    const accountInput = document.getElementById('accountNumber');
    if (accountInput) {
        accountInput.addEventListener('input', function(e) {
            // 숫자와 하이픈만 허용
            e.target.value = e.target.value.replace(/[^\d-]/g, '');
        });
    }
});

// 부드러운 스크롤 효과
document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 인디케이터 클릭시 부드럽게 스크롤
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const gallerySection = document.querySelector('.gallery');
            gallerySection.scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
    
    // 페이지 로드시 애니메이션 효과
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 키보드 이벤트 (ESC 키로 모달 닫기)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeGiftModal();
        closeAccountModal();
    }
});

// 풍선과 색종이 애니메이션 랜덤화
document.addEventListener('DOMContentLoaded', function() {
    const floatingElements = document.querySelectorAll('.balloon, .confetti');
    
    floatingElements.forEach(element => {
        // 랜덤한 애니메이션 지연
        const randomDelay = Math.random() * 3;
        element.style.animationDelay = randomDelay + 's';
        
        // 랜덤한 위치 조정
        const randomOffset = Math.random() * 20 - 10; // -10px ~ +10px
        element.style.transform = `translateX(${randomOffset}px)`;
    });
});

// 사진 카드 호버 효과 강화
document.addEventListener('DOMContentLoaded', function() {
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// 생일 축하 효과 (클릭시 색종이 효과)
function createConfetti() {
    const confettiColors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';
        
        document.body.appendChild(confetti);
        
        // 떨어지는 애니메이션
        confetti.animate([
            {
                transform: 'translateY(-10px) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translateY(100vh) rotate(720deg)`,
                opacity: 0
            }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = function() {
            confetti.remove();
        };
    }
}

// 생일 이모지 클릭시 색종이 효과
document.addEventListener('DOMContentLoaded', function() {
    const birthdayEmoji = document.querySelector('.birthday-emoji');
    if (birthdayEmoji) {
        birthdayEmoji.addEventListener('click', createConfetti);
        birthdayEmoji.style.cursor = 'pointer';
    }
});