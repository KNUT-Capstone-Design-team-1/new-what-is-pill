package capstone.pill.repository;

import capstone.pill.domain.Pill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PillRepository extends JpaRepository<Pill, Long> {

    // 약학정보원사이트에 접속이 되지 않을 때 DB에서 검색한다.
    Pill findPillByDrugDiscriminationAndDrugShapeAndDrugLine(String drugDiscrimination, String Shape, String Line);

    Pill findPillByDrugDiscriminationAndDrugShape(String drugDiscrimination, String drugShape);
}
