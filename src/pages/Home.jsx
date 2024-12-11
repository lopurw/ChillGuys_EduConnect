import classes from '../styles/Home.module.css';

const Home = () => {
  return (
      <div className={classes.wrapper}>
          <div className={classes.container}>
              <h1>EduConnect - онлайн платформа для студентов, прподавателей и работодателей</h1>
              <div className={classes.info_blocks}>
                  <div className={classes.info_block}>
                      Проходите интересное и интерактивное обучение на курсах от наших преподавателей, а также ищите самые лучшие вакансии.
                  </div>
                  <div className={classes.info_block}>
                      Станьте одним из наших преподавателей и выпускайте полезные курсы для учащихся.
                  </div>
                  <div className={classes.info_block}>
                      Предлагайте свои вакансии и давайте необходимый опыт лучшим из студентов.
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Home;
