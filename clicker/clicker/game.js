
// Обновляем текущий уровень игры из localStorage при каждой загрузке страницы
let currentLevel = localStorage.getItem('currentLevel') || 'level-1';
console.log(`Текущий уровень: ${currentLevel}`);

// Начальное количество здоровья игрока
let health = parseInt(localStorage.getItem('playerHealth'), 10) || 100;

// Уменьшение здоровья игрока на уровне
const healthDecrementPerLevel = {
    'level-1': 1,
    'level-2': 2,
    'level-3': 3,
    'level-4': 3,
    'level-5': 3,
    'level-boss': 4,
    // Добавьте другие уровни по мере необходимости
};
//очищение локал сторэджа по клику на кнопку еще раз
function restartGame() {
    localStorage.clear(); // Очищаем весь localStorage
    window.location.href = 'level1.html'; // Перенаправляем игрока на первый уровень
}

function restartGameBoss() {
    localStorage.clear(); // Очищаем весь localStorage

    // Устанавливаем начальные параметры для уровня с боссом
    const currentLevel = 'level-boss'; // Устанавливаем уровень босса

    // Сохраняем начальные параметры в localStorage
    localStorage.setItem('currentLevel', currentLevel);

    window.location.href = 'boss.html'; // Перенаправляем игрока на уровень с боссом
}






function reduceHealth() {
    if (healthDecrementPerLevel[currentLevel]) {
        health -= healthDecrementPerLevel[currentLevel];
        console.log(`На уровне ${currentLevel} здоровье уменьшается на ${healthDecrementPerLevel[currentLevel]}. Текущее здоровье: ${health}`);
        updateHealthBar();

        if (health <= 0) {
            clearInterval(healthInterval);
            window.location.href = 'defeat.html';
            // Здесь можно добавить логику для обработки окончания игры
        }
    } else {
        console.log(`Ошибка: неопределенное уменьшение здоровья для уровня ${currentLevel}.`);
    }
}

function updateHealthBar() {
    const healthBar = document.getElementById('health-bar');
    if (healthBar) {
        healthBar.style.width = `${health}%`;
    }
}





document.addEventListener('DOMContentLoaded', (event) => {
    updateHealthBar(); // Обновляем полоску здоровья при загрузке страницы

    const healItem = document.getElementById('heal');
    if (healItem) {
        healItem.addEventListener('click', () => {
            healPlayer(70); // Восстанавливаем 20 HP
            setTimeout(() => {
                window.location.href = 'level5.html'; // Возвращаемся обратно на уровень 5 после задержки
            }, 500); // Задержка в 1 секунду
        });
    }
});

function healPlayer(amount) {
    health += amount; // Увеличиваем здоровье игрока на указанное значение
    if (health > 100) health = 100; // Убедимся, что здоровье не превышает максимально допустимый уровень
    console.log(`Здоровье восстановлено. Текущее здоровье: ${health}`);
    updateHealthBar(); // Обновляем полоску здоровья в UI
    localStorage.setItem('playerHealth', health.toString()); // Сохраняем обновленное значение здоровья в localStorage
}

    // Тут добавляем код для обработки кликов по врагам
    const enemiesClasses = ['enemy-level1', 'enemy-level2', 'enemy2-level2', 'enemy-level3', 'enemy2-level3', 'enemy3-level3', 'enemy-level4', 'enemy2-level4', 'enemy3-level4', 'enemy4-level4', 'enemy-level5', 'enemy2-level5', 'enemy3-level5', 'enemy4-level5', 'enemy5-level5', 'enemy-boss'];
    enemiesClasses.forEach(cls => {
        document.querySelectorAll('.' + cls).forEach(enemy => {
            enemy.addEventListener('click', () => {
                console.log('Enemy clicked'); // Для отладки
                showShotEffect();
            });
        });


    function showShotEffect() {
        const shotEffect = document.getElementById('shot-effect').parentNode; // Получаем родительский элемент, так как стиль display устанавливается для контейнера
        const shotSound = document.getElementById('shot-sound'); // Получаем элемент аудио
        
        if (shotEffect && shotSound) {
            console.log('Showing shot effect and playing sound'); // Для отладки
            shotEffect.style.display = 'block'; // Показываем эффект выстрела
            shotSound.currentTime = 0; // Перематываем на начало, если звук уже играл
            shotSound.play(); // Воспроизводим звук выстрела
            
            setTimeout(() => {
                console.log('Hiding shot effect'); // Для отладки
                shotEffect.style.display = 'none'; // Скрываем эффект через короткий промежуток времени
            }, 50); // Изменено на 50 мс для быстрого скрытия, скорректируйте по необходимости
        }
    }

});



// Запускаем интервал уменьшения здоровья игрока
const healthInterval = setInterval(reduceHealth, 1000);


//хп врага первый уровень

let enemyHealth = 50; // Общее здоровье для врага на первом уровне

// Общая функция для обновления полоски здоровья врага
function updateEnemyHealthBar() {
    const enemyHealthBar = document.getElementById(currentLevel === 'level-1' ? 'enemy-health-bar' : 'enemy-level2-health-bar');
    const healthPercentage = (enemyHealth / 50) * 100; // Процент здоровья от максимума
    if (enemyHealthBar) { // Проверяем, существует ли элемент
        enemyHealthBar.style.width = `${healthPercentage}%`;
    }
}

// Функция для уменьшения здоровья врага на первом уровне и проверки условий перехода на следующий уровень
function reduceEnemyHealth() {
    if (currentLevel === 'level-1') { // Убедимся, что мы на первом уровне
        enemyHealth -= 5;
        updateEnemyHealthBar();

        if (enemyHealth <= 0) {
            console.log("Враг побежден");
            const enemyElement = document.getElementById('enemy-level1'); // ID врага для первого уровня
            enemyElement.classList.add('enemy-dead'); // Добавляем класс для "падения"
            playDeadSound(); // Воспроизводим звук смерти
                proceedToNextLevel();
        }
    }
}
//Функция звука смерти врага
function playDeadSound() {
    const deadSound = document.getElementById('dead-sound');
    if (deadSound) {
        deadSound.currentTime = 0; // Обнуляем время для повторного воспроизведения
        deadSound.play(); // Воспроизводим звук
    }
}


//хп врагов 2 уровень 
let enemyHealth1 = 50; // Здоровье первого врага на втором уровне
let enemyHealth2 = 50; // Здоровье второго врага на втором уровне

// Функции для уменьшения здоровья врагов на втором уровне
function reduceEnemyHealthLevel2(enemyNumber) {
    if (currentLevel === 'level-2') {
        let enemyDead = false; // Флаг для проверки, умер ли враг

        if (enemyNumber === 1) {
            enemyHealth1 -= 5;
            updateSpecificEnemyHealthBar('enemy-level2-health-bar', enemyHealth1);
            if (enemyHealth1 <= 0) {
                document.getElementById('enemy-level2').classList.add('enemy-dead'); // Добавляем класс для "падения"
                playDeadSound(); // Воспроизводим звук смерти
                enemyDead = true;
            }
        } else if (enemyNumber === 2) {
            enemyHealth2 -= 5;
            updateSpecificEnemyHealthBar('enemy2-level2-health-bar', enemyHealth2);
            if (enemyHealth2 <= 0) {
                document.getElementById('enemy2-level2').classList.add('enemy-dead'); // Добавляем класс для "падения"
                playDeadSound(); // Воспроизводим звук смерти
                enemyDead = true;
            }
        }

        // Проверяем, побеждены ли оба врага
        if (enemyHealth1 <= 0 && enemyHealth2 <= 0 && enemyDead) {
            console.log("Все враги на втором уровне побеждены");
                proceedToNextLevel();
        }
    }
}


// Обновление конкретной полоски здоровья
function updateSpecificEnemyHealthBar(barId, currentHealth) {
    const enemyHealthBar = document.getElementById(barId);
    const healthPercentage = (currentHealth / 50) * 100;
    if (enemyHealthBar) { // Проверяем, существует ли элемент
        enemyHealthBar.style.width = `${healthPercentage}%`;
    }
}

// Общая функция для перехода на следующий уровень
// Общая функция для перехода на следующий уровень
function proceedToNextLevel() {
    setTimeout(() => { // Начало задержки
    if (currentLevel === 'level-1') {
        console.log("Первый уровень пройден, переход на второй уровень");
        currentLevel = 'level-2'; // Обновляем текущий уровень
        localStorage.setItem('currentLevel', currentLevel); // Сохраняем текущий уровень в localStorage
        localStorage.setItem('playerHealth', health.toString()); // Сохраняем текущее здоровье игрока
        window.location.href = 'level2.html'; // Переход на страницу второго уровня
    } else if (currentLevel === 'level-2') {
        console.log("Второй уровень пройден, переход на третий уровень");
        currentLevel = 'level-3'; // Обновляем текущий уровень
        localStorage.setItem('currentLevel', currentLevel); // Сохраняем текущий уровень в localStorage
        localStorage.setItem('playerHealth', health.toString()); // Сохраняем текущее здоровье игрока
        window.location.href = 'level3.html'; // Переход на страницу третьего уровня
    } else if (currentLevel === 'level-3') {
        console.log("Третий уровень пройден, игра окончена");
        currentLevel = 'level-4'; // Обновляем текущий уровень
        localStorage.setItem('currentLevel', currentLevel); // Сохраняем текущий уровень в localStorage
        localStorage.setItem('playerHealth', health.toString()); // Сохраняем текущее здоровье игрока
        window.location.href = 'level4.html'; // Переход на страницу третьего уровня
    } else if (currentLevel === 'level-4') {
        console.log("Третий уровень пройден, игра окончена");
        currentLevel = 'level-5'; // Обновляем текущий уровень
        localStorage.setItem('currentLevel', currentLevel); // Сохраняем текущий уровень в localStorage
        localStorage.setItem('playerHealth', health.toString()); // Сохраняем текущее здоровье игрока
        window.location.href = 'level5.html'; // Переход на страницу третьего уровня
    } else if (currentLevel === 'level-5') {
        console.log("Третий уровень пройден, игра окончена");
        currentLevel = 'level-boss'; // Обновляем текущий уровень
        localStorage.setItem('currentLevel', currentLevel); // Сохраняем текущий уровень в localStorage
        localStorage.setItem('playerHealth', health.toString()); // Сохраняем текущее здоровье игрока
        window.location.href = 'boss.html'; // Переход на страницу третьего уровня
    }
}, 500); // Задержка в 500 миллисекунд
    // Добавьте дополнительные условия для других уровней, если они есть
}



// Добавление обработчиков событий
if (currentLevel === 'level-1') {
    document.getElementById('enemy-level1').addEventListener('click', reduceEnemyHealth);
} else if (currentLevel === 'level-2') {
    document.getElementById('enemy-level2').addEventListener('click', function() { reduceEnemyHealthLevel2(1); });
    document.getElementById('enemy2-level2').addEventListener('click', function() { reduceEnemyHealthLevel2(2); });
}


let enemyHealth3_1 = 50; // Здоровье первого врага на третьем уровне
let enemyHealth3_2 = 50; // Здоровье второго врага на третьем уровне
let enemyHealth3_3 = 50; // Здоровье третьего врага на третьем уровне

// Функции для уменьшения здоровья врагов на третьем уровне
function reduceEnemyHealthLevel3(enemyNumber) {
    if (currentLevel === 'level-3') {
        let currentHealth;
        let barId;
        let enemyElementId;
        
        switch (enemyNumber) {
            case 1:
                enemyHealth3_2 -= 5;
                currentHealth = enemyHealth3_2;
                barId = 'enemy2-level3-health-bar';
                enemyElementId = 'enemy-level3'; // Исправлено на соответствие случаю
                break;
            case 2:
                enemyHealth3_1 -= 5;
                currentHealth = enemyHealth3_1;
                barId = 'enemy-level3-health-bar';
                enemyElementId = 'enemy2-level3'; // Исправлено на соответствие случаю
                break;
            case 3:
                enemyHealth3_3 -= 5;
                currentHealth = enemyHealth3_3;
                barId = 'enemy3-level3-health-bar';
                enemyElementId = 'enemy3-level3'; // Сохранено правильное соответствие
                break;
        }
        updateSpecificEnemyHealthBar(barId, currentHealth);

        // Проверяем, достигло ли здоровье врага нуля и добавляем класс 'enemy-dead' для анимации "падения"
        if (currentHealth <= 0) {
            document.getElementById(enemyElementId).classList.add('enemy-dead');
            playDeadSound(); // Воспроизводим звук смерти
        }

        // Проверяем, побеждены ли все враги на уровне
        if (enemyHealth3_1 <= 0 && enemyHealth3_2 <= 0 && enemyHealth3_3 <= 0) {
            console.log("Все враги на третьем уровне побеждены");
            proceedToNextLevel();
        }
    }
}



// Добавление обработчиков событий для врагов на третьем уровне
if (currentLevel === 'level-3') {
    document.getElementById('enemy-level3').addEventListener('click', function() { reduceEnemyHealthLevel3(1); });
    document.getElementById('enemy2-level3').addEventListener('click', function() { reduceEnemyHealthLevel3(2); });
    document.getElementById('enemy3-level3').addEventListener('click', function() { reduceEnemyHealthLevel3(3); });
}


let enemyHealth4_1 = 50; // Здоровье первого врага на четвертом уровне
let enemyHealth4_2 = 50; // Здоровье второго врага на четвертом уровне
let enemyHealth4_3 = 50; // Здоровье третьего врага на четвертом уровне
let enemyHealth4_4 = 50; // Здоровье четвертого врага на четвертом уровне

// Функции для уменьшения здоровья врагов на четвертом уровне
function reduceEnemyHealthLevel4(enemyNumber) {
    if (currentLevel === 'level-4') {
        let currentHealth;
        let barId;
        let enemyElementId;
        
        switch (enemyNumber) {
            case 1:
                enemyHealth4_1 -= 5;
                currentHealth = enemyHealth4_1;
                barId = 'enemy-level4-health-bar';
                enemyElementId = 'enemy-level4';
                break;
            case 2:
                enemyHealth4_2 -= 5;
                currentHealth = enemyHealth4_2;
                barId = 'enemy2-level4-health-bar';
                enemyElementId = 'enemy2-level4';
                break;
            case 3:
                enemyHealth4_3 -= 5;
                currentHealth = enemyHealth4_3;
                barId = 'enemy3-level4-health-bar';
                enemyElementId = 'enemy3-level4';
                break;
            case 4:
                enemyHealth4_4 -= 2,5; // Убедитесь, что это соответствует вашему стандартному значению урона
                currentHealth = enemyHealth4_4;
                barId = 'enemy4-level4-health-bar';
                enemyElementId = 'enemy4-level4';
                break;
        }
        updateSpecificEnemyHealthBar(barId, currentHealth);

        if (currentHealth <= 0) {
            document.getElementById(enemyElementId).classList.add('enemy-dead');
            playDeadSound(); // Воспроизводим звук смерти
        }

        if (enemyHealth4_1 <= 0 && enemyHealth4_2 <= 0 && enemyHealth4_3 <= 0 && enemyHealth4_4 <= 0) {
            console.log("Все враги на четвертом уровне побеждены");
            proceedToNextLevel();
        }
    }
}



// Добавление обработчиков событий для врагов на четвертом уровне
if (currentLevel === 'level-4') {
    document.getElementById('enemy-level4').addEventListener('click', function() { reduceEnemyHealthLevel4(1); });
    document.getElementById('enemy2-level4').addEventListener('click', function() { reduceEnemyHealthLevel4(2); });
    document.getElementById('enemy3-level4').addEventListener('click', function() { reduceEnemyHealthLevel4(3); });
    document.getElementById('enemy4-level4').addEventListener('click', function() { reduceEnemyHealthLevel4(4); });
}


let enemyHealth5_1 = 50; // Здоровье первого врага на пятом уровне
let enemyHealth5_2 = 50; // Здоровье второго врага на пятом уровне
let enemyHealth5_3 = 50; // Здоровье третьего врага на пятом уровне
let enemyHealth5_4 = 50; // Здоровье четвертого врага на пятом уровне
let enemyHealth5_5 = 50; // Здоровье пятого врага на пятом уровне

function reduceEnemyHealthLevel5(enemyNumber) {
    if (currentLevel === 'level-5') {
        let currentHealth;
        let barId;
        let enemyElementId;
        
        switch (enemyNumber) {
            case 1:
                enemyHealth5_1 -= 5;
                currentHealth = enemyHealth5_1;
                barId = 'enemy-level5-health-bar';
                enemyElementId = 'enemy-level5'; // Указываем ID элемента врага
                break;
            case 2:
                enemyHealth5_2 -= 5;
                currentHealth = enemyHealth5_2;
                barId = 'enemy2-level5-health-bar';
                enemyElementId = 'enemy2-level5'; // Указываем ID элемента врага
                break;
            case 3:
                enemyHealth5_3 -= 5;
                currentHealth = enemyHealth5_3;
                barId = 'enemy3-level5-health-bar';
                enemyElementId = 'enemy3-level5'; // Указываем ID элемента врага
                break;
            case 4:
                enemyHealth5_4 -= 2,5; // Исправьте здесь, если 2.5 была ошибка
                currentHealth = enemyHealth5_4;
                barId = 'enemy4-level5-health-bar';
                enemyElementId = 'enemy4-level5'; // Указываем ID элемента врага
                break;
            case 5:
                enemyHealth5_5 -= 2,5; // Исправьте здесь, если 2.5 была ошибка
                currentHealth = enemyHealth5_5;
                barId = 'enemy5-level5-health-bar';
                enemyElementId = 'enemy5-level5'; // Указываем ID элемента врага
                break;
        }
        updateSpecificEnemyHealthBar(barId, currentHealth);

        if (currentHealth <= 0) {
            document.getElementById(enemyElementId).classList.add('enemy-dead');
            playDeadSound(); // Воспроизводим звук смерти
        }

        if (enemyHealth5_1 <= 0 && enemyHealth5_2 <= 0 && enemyHealth5_3 <= 0 && enemyHealth5_4 <= 0 && enemyHealth5_5 <= 0) {
            console.log("Все враги на пятом уровне побеждены");
            proceedToNextLevel();
        }
    }
}



// Добавление обработчиков событий для врагов на пятом уровне
if (currentLevel === 'level-5') {
    document.getElementById('enemy-level5').addEventListener('click', function() { reduceEnemyHealthLevel5(1); });
    document.getElementById('enemy2-level5').addEventListener('click', function() { reduceEnemyHealthLevel5(2); });
    document.getElementById('enemy3-level5').addEventListener('click', function() { reduceEnemyHealthLevel5(3); });
    document.getElementById('enemy4-level5').addEventListener('click', function() { reduceEnemyHealthLevel5(4); });
    document.getElementById('enemy5-level5').addEventListener('click', function() { reduceEnemyHealthLevel5(5); });
}


let bossHealth = 100; // Начальное здоровье босса

let bossSoundPlayed = false; // Добавляем флаг, указывающий на то, воспроизводился ли звук

function reduceBossHealth() {
    if (currentLevel === 'level-boss') {
        bossHealth -= 2; // или другое значение, на которое вы хотите уменьшать здоровье
        updateBossHealthBar(); // Обновляем полоску здоровья босса

        // Воспроизводим звук только если он не был воспроизведен ранее и здоровье босса уменьшилось
        if (!bossSoundPlayed) {
            const bossSound = document.getElementById('boss-sound');
            if (bossSound) {
                bossSound.play().catch(e => console.error('Error playing sound:', e));
                bossSoundPlayed = true; // Устанавливаем флаг в true после воспроизведения
            }
        }

        if (bossHealth <= 0) {
            document.getElementById('enemy-boss').classList.add('enemy-dead'); // Добавляем класс для "падения"
            playDeadSound(); // Воспроизводим звук смерти
            setTimeout(() => {
                window.location.href = 'victory.html'; // Перенаправляем на страницу победы после падения босса
            }, 500); // Задержка перед переходом для отображения анимации
        }
    }
}





// Функция для обновления полоски здоровья босса
function updateBossHealthBar() {
    const bossHealthBar = document.getElementById('boss-health-bar');
    const healthPercentage = (bossHealth / 100) * 100; // Процент здоровья босса
    bossHealthBar.style.width = `${healthPercentage}%`;
}


// Добавление обработчика события для босса
document.getElementById('enemy-boss').addEventListener('click', reduceBossHealth);










