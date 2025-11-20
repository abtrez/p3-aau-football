package p3.group.p3_aau_football.statistic.common;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface StatisticsRepository<T, String> extends MongoRepository<T, String> {
    //probably put some stuff in here
}
