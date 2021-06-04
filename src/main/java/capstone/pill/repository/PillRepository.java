package capstone.pill.repository;

import capstone.pill.domain.Pill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PillRepository extends JpaRepository<Pill, Long> {

    Pill findPillByDrugDiscriminationAndDrugShapeAndDrugLine(String drugDiscrimination, String Shape, String Line);
}
