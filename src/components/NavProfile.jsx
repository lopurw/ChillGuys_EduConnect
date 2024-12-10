import React, { useState } from 'react';

import CourseList from './CourseList';

const NavProfile = () => {
  const [role, setRole] = useState('студент');
  const [selectedTab, setSelectedTab] = useState('personalInfo');
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState({
    login: 'user123',
    password: 'password123',
    firstName: 'Иван',
    lastName: 'Иванов',
    middleName: 'Иванович',
    birthDate: '01.01.1990',
    photo: 'https://via.placeholder.com/100',
    institution: 'МГУ',
    company: 'ООО Рога и Копыта',
    contactNumber: '123-456-7890',
    techStack: 'React, JavaScript, Node.js, Express',
    englishLevel: 'Intermediate',
    additionalInfo: 'Готов к удаленной работе, активно учусь и развиваюсь.',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getTabs = () => {
    if (role === 'студент') {
      return ['personalInfo', 'portfolio', 'myCourses', 'projects'];
    } else if (role === 'преподаватель') {
      return ['personalInfo', 'myCourses'];
    } else if (role === 'работодатель') {
      return ['personalInfo', 'vacancies'];
    }
    return ['personalInfo'];
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'personalInfo':
        return (
          <div>
            <h3>Личная информация</h3>
            <div>
              <img src={userData.photo} alt="Фото профиля" width={100} height={100} />
            </div>
            <div>
              <div>
                Логин: {isEditable ? <input type="text" name="login" value={userData.login} onChange={handleInputChange} /> : userData.login}
              </div>
              <div>
                Пароль: {isEditable ? <input type="password" name="password" value={userData.password} onChange={handleInputChange} /> : userData.password}
              </div>
              <div>
                Имя: {isEditable ? <input type="text" name="firstName" value={userData.firstName} onChange={handleInputChange} /> : userData.firstName}
              </div>
              <div>
                Фамилия: {isEditable ? <input type="text" name="lastName" value={userData.lastName} onChange={handleInputChange} /> : userData.lastName}
              </div>
              <div>
                Отчество: {isEditable ? <input type="text" name="middleName" value={userData.middleName} onChange={handleInputChange} /> : userData.middleName}
              </div>
              <div>
                Дата рождения: {isEditable ? <input type="date" name="birthDate" value={userData.birthDate} onChange={handleInputChange} /> : userData.birthDate}
              </div>
              <div>
                {role === 'студент' && (
                  <div>
                    Место обучения: {isEditable ? <input type="text" name="institution" value={userData.institution} onChange={handleInputChange} /> : userData.institution}
                  </div>
                )}
                {role === 'преподаватель' && (
                  <div>
                    Название учреждения: {isEditable ? <input type="text" name="institution" value={userData.institution} onChange={handleInputChange} /> : userData.institution}
                  </div>
                )}
                {role === 'работодатель' && (
                  <div>
                    Название компании: {isEditable ? <input type="text" name="company" value={userData.company} onChange={handleInputChange} /> : userData.company}
                  </div>
                )}
              </div>
              <div>
                Контактный номер: {isEditable ? <input type="text" name="contactNumber" value={userData.contactNumber} onChange={handleInputChange} /> : userData.contactNumber}
              </div>
              <button onClick={() => setIsEditable(!isEditable)}>
                {isEditable ? 'Сохранить изменения' : 'Редактировать'}
              </button>
            </div>
          </div>
        );
      case 'portfolio':
        return (
          <div>
            <h3>Портфолио</h3>
            <div>
              <img src={userData.photo} alt="Фото профиля" width={100} height={100} />
            </div>
            <div>
              <p>Имя: {userData.firstName} {userData.lastName} {userData.middleName}</p>
              <p>Стек технологий: {userData.techStack}</p>
              <p>Уровень английского: {userData.englishLevel}</p>
              <p>Дополнительная информация: {userData.additionalInfo}</p>
              <h4>Курсы:</h4>
              <CourseList />
            </div>
          </div>
        );
      case 'myCourses':
        return <CourseList />;
      case 'projects':
        return <div>Заглушка для проектов</div>;
      case 'vacancies':
        return <div>Заглушка для вакансий</div>;
      default:
        return <div>Выберите вкладку</div>;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '200px', padding: '10px' }}>
        <h2>Навигация</h2>
        <ul>
          {getTabs().map((tab) => (
            <li key={tab}>
              <button onClick={() => setSelectedTab(tab)}>
                {tab === 'personalInfo' ? 'Личная информация' :
                 tab === 'portfolio' ? 'Портфолио' :
                 tab === 'myCourses' ? 'Мои курсы' :
                 tab === 'projects' ? 'Проекты' : 'Вакансии'}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ padding: '10px', flex: 1 }}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default NavProfile;
