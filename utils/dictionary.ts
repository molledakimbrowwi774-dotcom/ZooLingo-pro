import { WordData } from '../types';

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper to expand compact data into full WordData objects
const expand = (words: string[][]): WordData[] => {
  return words.map(([english, chinese, us_ipa, uk_ipa, ex_en, ex_zh]) => ({
    id: generateId(),
    english,
    chinese,
    type: 'Word',
    us_ipa,
    uk_ipa,
    examples: [
      { en: ex_en, zh: ex_zh }
    ]
  }));
};

// --- IELTS BAND 7.0 - 9.0 VOCABULARY STORE ---
// Massive expansion to ensure "Refresh" always brings new content.
const rawDictionary: Record<string, string[][]> = {
  // 1. Education (Academic & University Life)
  'school': [
    ['Curriculum', '课程体系', 'kəˈrɪkjələm', 'kəˈrɪkjələm', 'The curriculum encompasses a wide array of subjects.', '该课程体系涵盖了广泛的学科。'],
    ['Pedagogy', '教学法', 'ˈpedəɡɑːdʒi', 'ˈpedəɡɒdʒi', 'Modern pedagogy emphasizes critical thinking.', '现代教学法强调批判性思维。'],
    ['Plagiarism', '剽窃/抄袭', 'ˈpleɪdʒərɪzəm', 'ˈpleɪdʒərɪzəm', 'Plagiarism is a severe academic offense.', '剽窃是严重的学术过失。'],
    ['Autonomy', '自主权', 'ɔːˈtɑːnəmi', 'ɔːˈtɒnəmi', 'Students are encouraged to develop learner autonomy.', '鼓励学生培养学习自主权。'],
    ['Literacy', '读写能力', 'ˈlɪtərəsi', 'ˈlɪtərəsi', 'Digital literacy is clear-cut in the modern era.', '数字读写能力在现代至关重要。'],
    ['Discipline', '学科/纪律', 'ˈdɪsəplɪn', 'ˈdɪsəplɪn', 'Interdisciplinary studies combine multiple disciplines.', '跨学科研究结合了多个学科。'],
    ['Assessment', '评估', 'əˈsesmənt', 'əˈsesmənt', 'Formative assessment aids learning progress.', '形成性评估有助于学习进步。'],
    ['Vocational', '职业的', 'voʊˈkeɪʃənl', 'vəʊˈkeɪʃənl', 'Vocational training bridges the skills gap.', '职业培训弥合了技能差距。'],
    ['Extracurricular', '课外的', 'ˌekstrəkəˈrɪkjələr', 'ˌekstrəkəˈrɪkjələ', 'Extracurricular activities foster social skills.', '课外活动培养社交技能。'],
    ['Dissertation', '学位论文', 'ˌdɪsərˈteɪʃn', 'ˌdɪsəˈteɪʃn', 'She is drafting her doctoral dissertation.', '她正在起草博士论文。'],
    ['Faculty', '全体教员', 'ˈfæklti', 'ˈfæklti', 'The faculty voted on the new policy.', '全体教员对新政策进行了投票。'],
    ['Alumni', '校友', 'əˈlʌmnaɪ', 'əˈlʌmnaɪ', 'The alumni network provides mentorship.', '校友网络提供指导。'],
    ['Tuition', '学费', 'tuˈɪʃn', 'tjuˈɪʃn', 'Exorbitant tuition fees deter some students.', '高昂的学费吓退了一些学生。'],
    ['Syllabus', '教学大纲', 'ˈsɪləbəs', 'ˈsɪləbəs', 'The syllabus outlines the course objectives.', '教学大纲概述了课程目标。'],
    ['Peer', '同龄人', 'pɪr', 'pɪə', 'Peer pressure can be detrimental.', '同辈压力可能是有害的。'],
    // NEW ADDITIONS v7
    ['Sabbatical', '学术休假', 'səˈbætɪkl', 'səˈbætɪkl', 'The professor is on sabbatical to write a book.', '教授正在休学术假写书。'],
    ['Prerequisite', '先决条件', 'ˌpriːˈrekwəzɪt', 'ˌpriːˈrekwəzɪt', 'Calculus is a prerequisite for physics.', '微积分是物理学的先决条件。'],
    ['Auditorium', '礼堂', 'ˌɔːdɪˈtɔːriəm', 'ˌɔːdɪˈtɔːriəm', 'The lecture was held in the main auditorium.', '讲座在主礼堂举行。'],
    ['Transcript', '成绩单', 'ˈtrænskrɪpt', 'ˈtrænskrɪpt', 'Submit your official transcript with the application.', '提交申请时请附上正式成绩单。'],
    ['Tenure', '终身教职', 'ˈtenjər', 'ˈtenjə', 'She was granted tenure after five years.', '五年后她获得了终身教职。'],
    ['Seminar', '研讨会', 'ˈsemɪnɑːr', 'ˈsemɪnɑː', 'The graduate seminar focuses on ethics.', '研究生研讨会专注于伦理学。'],
    ['Enrollment', '注册/入学', 'ɪnˈroʊlmənt', 'ɪnˈrəʊlmənt', 'University enrollment has dropped this year.', '今年大学入学率有所下降。']
  ],
  
  // 2. Environment (Nature & Climate)
  'environment': [
    ['Biodiversity', '生物多样性', 'ˌbaɪoʊdaɪˈvɜːrsəti', 'ˌbaɪəʊdaɪˈvɜːsəti', 'Loss of biodiversity threatens ecosystems.', '生物多样性的丧失威胁着生态系统。'],
    ['Sustainability', '可持续性', 'səˌsteɪnəˈbɪləti', 'səˌsteɪnəˈbɪləti', 'Environmental sustainability is paramount.', '环境可持续性至关重要。'],
    ['Contamination', '污染', 'kənˌtæmɪˈneɪʃn', 'kənˌtæmɪˈneɪʃn', 'Water contamination poses health risks.', '水污染带来健康风险。'],
    ['Emission', '排放', 'ɪˈmɪʃn', 'ɪˈmɪʃn', 'Carbon emissions must be curtailed.', '必须削减碳排放。'],
    ['Renewable', '可再生的', 'rɪˈnuːəbl', 'rɪˈnjuːəbl', 'Investing in renewable energy is vital.', '投资可再生能源至关重要。'],
    ['Habitat', '栖息地', 'ˈhæbɪtæt', 'ˈhæbɪtæt', 'Habitat destruction endangers wildlife.', '栖息地破坏危及野生动物。'],
    ['Conservation', '保护', 'ˌkɑːnsərˈveɪʃn', 'ˌkɒnsəˈveɪʃn', 'Wildlife conservation requires funding.', '野生动物保护需要资金。'],
    ['Ecological', '生态的', 'ˌiːkəˈlɑːdʒɪkl', 'ˌiːkəˈlɒdʒɪkl', 'The ecological footprint of cities is huge.', '城市的生态足迹是巨大的。'],
    ['Degradation', '退化', 'ˌdeɡrəˈdeɪʃn', 'ˌdeɡrəˈdeɪʃn', 'Soil degradation affects agriculture.', '土壤退化影响农业。'],
    ['Disposable', '一次性的', 'dɪˈspoʊzəbl', 'dɪˈspəʊzəbl', 'Single-use disposable plastics are banned.', '一次性塑料被禁止。'],
    ['Deforestation', '森林砍伐', 'ˌdiːˌfɔːrɪˈsteɪʃn', 'ˌdiːˌfɒrɪˈsteɪʃn', 'Deforestation accelerates climate change.', '森林砍伐加速了气候变化。'],
    ['Pollutant', '污染物', 'pəˈluːtənt', 'pəˈluːtənt', 'Chemical pollutants harm marine life.', '化学污染物危害海洋生物。'],
    // NEW ADDITIONS v7
    ['Catastrophe', '灾难', 'kəˈtæstrəfi', 'kəˈtæstrəfi', 'Climate change could lead to a global catastrophe.', '气候变化可能导致全球性灾难。'],
    ['Drought', '干旱', 'draʊt', 'draʊt', 'Prolonged drought ruined the harvest.', '长期干旱毁了收成。'],
    ['Erosion', '侵蚀', 'ɪˈroʊʒn', 'ɪˈrəʊʒn', 'Coastal erosion is a major concern.', '海岸侵蚀是一个主要问题。'],
    ['Fossil', '化石', 'ˈfɑːsl', 'ˈfɒsl', 'Burning fossil fuels releases CO2.', '燃烧化石燃料会释放二氧化碳。'],
    ['Glacier', '冰川', 'ˈɡleɪʃər', 'ˈɡlæsiə', 'Glaciers are melting at an alarming rate.', '冰川正在以惊人的速度融化。'],
    ['Sanctuary', '避难所/保护区', 'ˈsæŋktʃuəri', 'ˈsæŋktʃuəri', 'This island is a bird sanctuary.', '这个岛是鸟类保护区。'],
    ['Poaching', '偷猎', 'ˈpoʊtʃɪŋ', 'ˈpəʊtʃɪŋ', 'Poaching threatens elephants with extinction.', '偷猎威胁着大象的生存。']
  ],

  // 3. Technology (Digital & AI)
  'technology': [
    ['Artificial', '人工的', 'ˌɑːrtɪˈfɪʃl', 'ˌɑːtɪˈfɪʃl', 'Artificial Intelligence creates ethical dilemmas.', '人工智能制造了伦理困境。'],
    ['Innovation', '创新', 'ˌɪnəˈveɪʃn', 'ˌɪnəˈveɪʃn', 'Technological innovation drives growth.', '技术创新推动增长。'],
    ['Automation', '自动化', 'ˌɔːtəˈmeɪʃn', 'ˌɔːtəˈmeɪʃn', 'Automation may displace manual workers.', '自动化可能会取代体力劳动者。'],
    ['Virtual', '虚拟的', 'ˈvɜːrtʃuəl', 'ˈvɜːtʃuəl', 'Virtual reality offers immersive experiences.', '虚拟现实提供沉浸式体验。'],
    ['Algorithm', '算法', 'ˈælɡərɪðəm', 'ˈælɡərɪðəm', 'Algorithms determine what content we see.', '算法决定我们看到的内容。'],
    ['Integration', '整合', 'ˌɪntɪˈɡreɪʃn', 'ˌɪntɪˈɡreɪʃn', 'Seamless integration of software.', '软件的无缝整合。'],
    ['Cybersecurity', '网络安全', 'ˌsaɪbərsɪˈkjʊrəti', 'ˌsaɪbəsɪˈkjʊərəti', 'Cybersecurity is a top priority.', '网络安全是重中之重。'],
    ['Breakthrough', '突破', 'ˈbreɪkθruː', 'ˈbreɪkθruː', 'A major medical breakthrough.', '一项重大的医学突破。'],
    ['Obsolete', '过时的', 'ˌɑːbsəˈliːt', 'ˈɒbsəliːt', 'Old gadgets quickly become obsolete.', '旧设备很快就会过时。'],
    ['Revolutionize', '彻底变革', 'ˌrevəˈluːʃənaɪz', 'ˌrevəˈluːʃənaɪz', 'The internet revolutionized communication.', '互联网彻底变革了通信。'],
    // NEW ADDITIONS v7
    ['Encryption', '加密', 'ɪnˈkrɪpʃn', 'ɪnˈkrɪpʃn', 'End-to-end encryption protects privacy.', '端到端加密保护隐私。'],
    ['Bandwidth', '带宽', 'ˈbændwɪdθ', 'ˈbændwɪdθ', 'High bandwidth is needed for streaming.', '流媒体需要高带宽。'],
    ['Latency', '延迟', 'ˈleɪtnsi', 'ˈleɪtnsi', 'Low latency is crucial for gaming.', '低延迟对游戏至关重要。'],
    ['Prototype', '原型', 'ˈproʊtətaɪp', 'ˈprəʊtətaɪp', 'They built a prototype of the robot.', '他们制造了机器人的原型。'],
    ['Interface', '界面/接口', 'ˈɪntərfeɪs', 'ˈɪntəfeɪs', 'The user interface is intuitive.', '用户界面很直观。'],
    ['Database', '数据库', 'ˈdeɪtəbeɪs', 'ˈdeɪtəbeɪs', 'The database stores millions of records.', '数据库存储了数百万条记录。'],
    ['Malware', '恶意软件', 'ˈmælwer', 'ˈmælweə', 'Malware corrupted the system files.', '恶意软件损坏了系统文件。']
  ],

  // 4. Health & Fitness (Medical & Body)
  'health': [
    ['Sedentary', '久坐的', 'ˈsednteri', 'ˈsedntri', 'A sedentary lifestyle causes obesity.', '久坐的生活方式导致肥胖。'],
    ['Obesity', '肥胖症', 'oʊˈbiːsəti', 'əʊˈbiːsəti', 'Obesity is a growing epidemic.', '肥胖症是一种日益严重的流行病。'],
    ['Nutrition', '营养', 'nuˈtrɪʃn', 'njuˈtrɪʃn', 'Adequate nutrition prevents disease.', '充足的营养可以预防疾病。'],
    ['Well-being', '幸福/安康', 'ˈwel biːɪŋ', 'ˈwel biːɪŋ', 'Mental well-being is often overlooked.', '心理健康常被忽视。'],
    ['Epidemic', '流行病', 'ˌepɪˈdemɪk', 'ˌepɪˈdemɪk', 'The flu epidemic spread rapidly.', '流感疫情迅速蔓延。'],
    ['Immune', '免疫的', 'ɪˈmjuːn', 'ɪˈmjuːn', 'A strong immune system fights infection.', '强大的免疫系统能抵抗感染。'],
    ['Chronic', '慢性的', 'ˈkrɑːnɪk', 'ˈkrɒnɪk', 'Chronic stress affects the heart.', '慢性压力影响心脏。'],
    ['Diagnosis', '诊断', 'ˌdaɪəɡˈnoʊsɪs', 'ˌdaɪəɡˈnəʊsɪs', 'Early diagnosis improves survival rates.', '早期诊断提高生存率。'],
    ['Therapeutic', '治疗的', 'ˌθerəˈpjuːtɪk', 'ˌθerəˈpjuːtɪk', 'Yoga has therapeutic benefits.', '瑜伽有治疗功效。'],
    ['Longevity', '长寿', 'lɔːnˈdʒevəti', 'lɒnˈdʒevəti', 'Diet plays a role in longevity.', '饮食对长寿有影响。'],
    // NEW ADDITIONS v7
    ['Metabolism', '新陈代谢', 'məˈtæbəlɪzəm', 'məˈtæbəlɪzəm', 'Exercise boosts your metabolism.', '运动能促进新陈代谢。'],
    ['Cardiovascular', '心血管的', 'ˌkɑːrdioʊˈvæskjələr', 'ˌkɑːdiəʊˈvæskjələ', 'Cardiovascular health is linked to diet.', '心血管健康与饮食有关。'],
    ['Fatigue', '疲劳', 'fəˈtiːɡ', 'fəˈtiːɡ', 'Chronic fatigue syndrome.', '慢性疲劳综合症。'],
    ['Hygiene', '卫生', 'ˈhaɪdʒiːn', 'ˈhaɪdʒiːn', 'Good hygiene prevents the spread of germs.', '良好的卫生习惯防止细菌传播。'],
    ['Prescription', '处方', 'prɪˈskrɪpʃn', 'prɪˈskrɪpʃn', 'The doctor wrote a prescription.', '医生开了处方。'],
    ['Vaccination', '疫苗接种', 'ˌvæksɪˈneɪʃn', 'ˌvæksɪˈneɪʃn', 'Vaccination campaigns saved millions.', '疫苗接种运动拯救了数百万人。'],
    ['Symptom', '症状', 'ˈsɪmptəm', 'ˈsɪmptəm', 'Fever is a common symptom.', '发烧是常见症状。']
  ],

  // 5. Work & Career (Business)
  'work': [
    ['Employability', '就业能力', 'ɪmˌplɔɪəˈbɪləti', 'ɪmˌplɔɪəˈbɪləti', 'Soft skills enhance employability.', '软技能增强就业能力。'],
    ['Entrepreneur', '企业家', 'ˌɑːntrəprəˈnɜːr', 'ˌɒntrəprəˈnɜː', 'Risk-taking is common for entrepreneurs.', '冒险对企业家来说很常见。'],
    ['Hierarchy', '层级', 'ˈhaɪərɑːrki', 'ˈhaɪərɑːki', 'Corporate hierarchy can be rigid.', '公司层级可能很僵化。'],
    ['Incentive', '激励', 'ɪnˈsentɪv', 'ɪnˈsentɪv', 'Financial incentives boost productivity.', '经济激励提高生产力。'],
    ['Collaboration', '协作', 'kəˌlæbəˈreɪʃn', 'kəˌlæbəˈreɪʃn', 'Cross-department collaboration.', '跨部门协作。'],
    ['Prospect', '前景', 'ˈprɑːspekt', 'ˈprɒspekt', 'Career prospects look promising.', '职业前景看起来很有希望。'],
    ['Redundant', '被裁员的/多余的', 'rɪˈdʌndənt', 'rɪˈdʌndənt', 'Workers were made redundant.', '工人被裁员了。'],
    ['Remuneration', '报酬', 'rɪˌmjuːnəˈreɪʃn', 'rɪˌmjuːnəˈreɪʃn', 'Fair remuneration is expected.', '期望获得公平的报酬。'],
    // NEW ADDITIONS v7
    ['Negotiation', '谈判', 'nɪˌɡoʊʃiˈeɪʃn', 'nɪˌɡəʊʃiˈeɪʃn', 'Salary negotiation requires tact.', '薪资谈判需要技巧。'],
    ['Recruitment', '招聘', 'rɪˈkruːtmənt', 'rɪˈkruːtmənt', 'The recruitment process takes weeks.', '招聘过程需要数周。'],
    ['Vacancy', '空缺', 'ˈveɪkənsi', 'ˈveɪkənsi', 'There is a job vacancy in sales.', '销售部有一个职位空缺。'],
    ['Resignation', '辞职', 'ˌrezɪɡˈneɪʃn', 'ˌrezɪɡˈneɪʃn', 'He handed in his resignation letter.', '他递交了辞职信。'],
    ['Merger', '合并', 'ˈmɜːrdʒər', 'ˈmɜːdʒə', 'The merger of two giant companies.', '两家巨头公司的合并。'],
    ['Revenue', '收入', 'ˈrevənuː', 'ˈrevənjuː', 'The company reported increased revenue.', '公司报告收入增加。'],
    ['Deadline', '截止日期', 'ˈdedlaɪn', 'ˈdedlaɪn', 'The deadline is approaching fast.', '截止日期快到了。']
  ],

  // 6. Global Issues / Society
  'society': [
    ['Globalization', '全球化', 'ˌɡloʊbələˈzeɪʃn', 'ˌɡləʊbələˈzeɪʃn', 'Globalization connects economies.', '全球化连接了各经济体。'],
    ['Urbanization', '城市化', 'ˌɜːrbənəˈzeɪʃn', 'ˌɜːbənaɪˈzeɪʃn', 'Rapid urbanization strains resources.', '快速城市化使资源紧张。'],
    ['Poverty', '贫穷', 'ˈpɑːvərti', 'ˈpɒvəti', 'Alleviating poverty is a global goal.', '缓解贫困是一个全球目标。'],
    ['Equality', '平等', 'iˈkwɑːləti', 'iˈkwɒləti', 'Gender equality is fundamental.', '性别平等是根本。'],
    ['Migration', '移民', 'maɪˈɡreɪʃn', 'maɪˈɡreɪʃn', 'Mass migration affects demographics.', '大规模移民影响人口结构。'],
    ['Infrastructure', '基础设施', 'ˈɪnfrəstrʌktʃər', 'ˈɪnfrəstrʌktʃə', 'Investing in infrastructure.', '投资基础设施。'],
    ['Demographic', '人口统计的', 'ˌdeməˈɡræfɪk', 'ˌdeməˈɡræfɪk', 'Demographic shifts impact policy.', '人口结构变化影响政策。'],
    // NEW ADDITIONS v7
    ['Discrimination', '歧视', 'dɪˌskrɪmɪˈneɪʃn', 'dɪˌskrɪmɪˈneɪʃn', 'Laws against racial discrimination.', '反对种族歧视的法律。'],
    ['Censorship', '审查制度', 'ˈsensərʃɪp', 'ˈsensəʃɪp', 'Internet censorship is debated.', '互联网审查制度备受争议。'],
    ['Corruption', '腐败', 'kəˈrʌpʃn', 'kəˈrʌpʃn', 'Fighting political corruption.', '打击政治腐败。'],
    ['Legislation', '立法', 'ˌledʒɪsˈleɪʃn', 'ˌledʒɪsˈleɪʃn', 'New legislation was passed yesterday.', '新立法昨天通过了。'],
    ['Privilege', '特权', 'ˈprɪvəlɪdʒ', 'ˈprɪvəlɪdʒ', 'Education should not be a privilege.', '教育不应是一种特权。'],
    ['Diversity', '多样性', 'daɪˈvɜːrsəti', 'daɪˈvɜːsəti', 'Cultural diversity enriches society.', '文化多样性丰富了社会。'],
    ['Stereotype', '刻板印象', 'ˈsteriətaɪp', 'ˈsteriətaɪp', 'Breaking gender stereotypes.', '打破性别刻板印象。']
  ],

  // --- GENERAL IELTS BAND 7.0 - 9.0 FILLER POOL ---
  'global_academic': [
    ['Ubiquitous', '无处不在的', 'juːˈbɪkwɪtəs', 'juːˈbɪkwɪtəs', 'Smartphones are ubiquitous today.', '如今智能手机无处不在。'],
    ['Ephemeral', '短暂的', 'ɪˈfemərəl', 'ɪˈfemərəl', 'Fashion trends are often ephemeral.', '时尚潮流往往是短暂的。'],
    ['Exacerbate', '恶化', 'ɪɡˈzæsərbeɪt', 'ɪɡˈzæsəbeɪt', 'Stress can exacerbate illness.', '压力会加重病情。'],
    ['Ameliorate', '改善', 'əˈmiːliəreɪt', 'əˈmiːliəreɪt', 'Steps to ameliorate the situation.', '改善局面的措施。'],
    ['Detrimental', '有害的', 'ˌdetrɪˈmentl', 'ˌdetrɪˈmentl', 'Smoking is detrimental to health.', '吸烟对健康有害。'],
    ['Inevitable', '不可避免的', 'ɪnˈevɪtəbl', 'ɪnˈevɪtəbl', 'Change is inevitable.', '改变是不可避免的。'],
    ['Pragmatic', '务实的', 'præɡˈmætɪk', 'præɡˈmætɪk', 'A pragmatic approach to problems.', '解决问题的务实方法。'],
    ['Resilient', '有弹性的/适应力强的', 'rɪˈzɪliənt', 'rɪˈzɪliənt', 'Children are often resilient.', '孩子们通常适应力很强。'],
    ['Ambiguous', '模棱两可的', 'æmˈbɪɡjuəs', 'æmˈbɪɡjuəs', 'The instructions were ambiguous.', '说明书模棱两可。'],
    ['Comprehensive', '全面的', 'ˌkɑːmprɪˈhensɪv', 'ˌkɒmprɪˈhensɪv', 'A comprehensive guide.', '一份全面的指南。'],
    ['Significant', '显著的', 'sɪɡˈnɪfɪkənt', 'sɪɡˈnɪfɪkənt', 'A significant improvement.', '显著的改进。'],
    ['Substantial', '大量的', 'səbˈstænʃl', 'səbˈstænʃl', 'A substantial amount of money.', '一大笔钱。'],
    ['Prevalent', '流行的', 'ˈprevələnt', 'ˈprevələnt', 'The disease is prevalent here.', '这种疾病在这里很流行。'],
    ['Imminent', '即将来临的', 'ˈɪmɪnənt', 'ˈɪmɪnənt', 'They were in imminent danger.', '他们处于迫在眉睫的危险中。'],
    ['Viable', '可行的', 'ˈvaɪəbl', 'ˈvaɪəbl', 'A viable solution.', '一个可行的解决方案。'],
    ['Profound', '深远的', 'prəˈfaʊnd', 'prəˈfaʊnd', 'A profound impact on society.', '对社会产生深远影响。'],
    ['Meticulous', '一丝不苟的', 'məˈtɪkjələs', 'məˈtɪkjələs', 'Meticulous attention to detail.', '对细节一丝不苟。'],
    ['Elaborate', '详尽的', 'ɪˈlæbərət', 'ɪˈlæbərət', 'An elaborate plan.', '一个详尽的计划。'],
    ['Fluctuate', '波动', 'ˈflʌktʃueɪt', 'ˈflʌktʃueɪt', 'Prices fluctuate wildly.', '价格波动很大。'],
    ['Implement', '实施', 'ˈɪmplɪment', 'ˈɪmplɪment', 'Implement a new strategy.', '实施新策略。'],
    ['Enhance', '增强', 'ɪnˈhæns', 'ɪnˈhɑːns', 'Enhance the user experience.', '增强用户体验。'],
    ['Diminish', '减少', 'dɪˈmɪnɪʃ', 'dɪˈmɪnɪʃ', 'His influence diminished over time.', '他的影响力随着时间减弱。'],
    ['Acquire', '获得', 'əˈkwaɪər', 'əˈkwaɪə', 'Acquire new skills.', '获得新技能。'],
    ['Retain', '保持', 'rɪˈteɪn', 'rɪˈteɪn', 'Retain good employees.', '留住好员工。'],
    // NEW ADDITIONS v7
    ['Spontaneous', '自发的', 'spɑːnˈteɪniəs', 'spɒnˈteɪniəs', 'A spontaneous decision to travel.', '一个自发的旅行决定。'],
    ['Simultaneous', '同时的', 'ˌsaɪmlˈteɪniəs', 'ˌsɪmlˈteɪniəs', 'Simultaneous interpretation.', '同声传译。'],
    ['Tentative', '暂定的', 'ˈtentətɪv', 'ˈtentətɪv', 'A tentative agreement.', '一个暂定的协议。'],
    ['Versatile', '多才多艺的/通用的', 'ˈvɜːrsətl', 'ˈvɜːsətaɪl', 'This tool is extremely versatile.', '这个工具非常通用。'],
    ['Vulnerable', '易受伤害的', 'ˈvʌlnərəbl', 'ˈvʌlnərəbl', 'Children are vulnerable to infection.', '儿童容易受到感染。'],
    ['Arbitrary', '武断的/随意的', 'ˈɑːrbɪtrəri', 'ˈɑːbɪtrəri', 'An arbitrary decision.', '一个武断的决定。'],
    ['Coherent', '连贯的', 'koʊˈhɪrənt', 'kəʊˈhɪərənt', 'A coherent argument.', '一个连贯的论点。'],
    ['Tedious', '乏味的', 'ˈtiːdiəs', 'ˈtiːdiəs', 'The work was tedious and slow.', '工作乏味且缓慢。'],
    ['Rigorous', '严格的', 'ˈrɪɡərəs', 'ˈrɪɡərəs', 'Rigorous safety checks.', '严格的安全检查。'],
    ['Plausible', '看似合理的', 'ˈplɔːzəbl', 'ˈplɔːzəbl', 'A plausible explanation.', '一个看似合理的解释。']
  ]
};

// NEW: Rich Scene Configuration with Chinese and English Keywords
const sceneConfig: Record<string, { en: string[], zh: string[], label: string }> = {
  'school': {
    en: ['school', 'education', 'study', 'university', 'student', 'learn', 'academic'],
    zh: ['学校', '教育', '学习', '大学', '学生', '学术', '上课', '校园', '读书', '考试', '留学'],
    label: '🎓 教育 / Education'
  },
  'environment': {
    en: ['nature', 'pollution', 'green', 'climate', 'earth', 'eco', 'animal'],
    zh: ['环境', '自然', '污染', '绿色', '气候', '地球', '生态', '动物', '环保', '公园', '天气'],
    label: '🌳 环境 / Environment'
  },
  'technology': {
    en: ['tech', 'computer', 'ai', 'phone', 'digital', 'future', 'smart'],
    zh: ['科技', '技术', '电脑', '人工智能', '手机', '数字', '未来', '智能', '网络', '上网', '编程'],
    label: '💻 科技 / Technology'
  },
  'health': {
    en: ['doctor', 'hospital', 'fit', 'gym', 'sick', 'medicine', 'body'],
    zh: ['健康', '医院', '医生', '健身', '生病', '药物', '身体', '医疗', '诊所', '看病', '药房'],
    label: '🏥 健康 / Health'
  },
  'work': {
    en: ['job', 'career', 'business', 'office', 'company', 'money', 'boss'],
    zh: ['工作', '职业', '商业', '办公室', '公司', '钱', '老板', '职场', '上班', '面试', '开会'],
    label: '💼 职场 / Work'
  },
  'society': {
    en: ['city', 'people', 'world', 'news', 'global', 'life', 'community'],
    zh: ['社会', '城市', '人', '世界', '新闻', '全球', '生活', '社区', '民生', '交通', '旅游'],
    label: '🌍 社会 / Society'
  }
};

export const searchLocalDictionary = (query: string): WordData[] | null => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // 1. Direct match
  if (rawDictionary[normalizedQuery]) {
    return expand(rawDictionary[normalizedQuery]);
  }

  // 2. Keyword match (Check EN and ZH keywords)
  for (const [key, config] of Object.entries(sceneConfig)) {
    // Check key match
    if (key === normalizedQuery) return expand(rawDictionary[key]);

    // Check English keywords (partial match)
    if (config.en.some(k => normalizedQuery.includes(k) || k.includes(normalizedQuery))) {
      return expand(rawDictionary[key]);
    }
    
    // Check Chinese keywords (partial match)
    // Supports query="我想去医院" -> matches "医院"
    if (config.zh.some(k => normalizedQuery.includes(k) || k.includes(normalizedQuery))) {
      return expand(rawDictionary[key]);
    }
  }

  return null;
};

// Robust helper to get random words from ALL scenes + Global Academic
export const getRandomGlobalWords = (count: number): WordData[] => {
  const allWordsRaw = Object.values(rawDictionary).flat();
  const shuffled = [...allWordsRaw].sort(() => 0.5 - Math.random());
  const selectedRaw = shuffled.slice(0, count);
  return expand(selectedRaw);
};

export const getScenarioSuggestions = (query: string): { key: string, label: string }[] => {
  if (!query || query.trim().length === 0) return [];
  const lowerQuery = query.toLowerCase().trim();
  const matches: { key: string, label: string }[] = [];

  for (const [key, config] of Object.entries(sceneConfig)) {
    // Match key, EN keywords, or ZH keywords
    const matchEn = config.en.some(k => k.includes(lowerQuery) || lowerQuery.includes(k));
    const matchZh = config.zh.some(k => k.includes(lowerQuery) || lowerQuery.includes(k));
    const matchKey = key.includes(lowerQuery);

    if (matchKey || matchEn || matchZh) {
      matches.push({ key, label: config.label });
    }
  }
  
  // Deduplicate based on key
  const uniqueMatches = Array.from(new Set(matches.map(m => m.key)))
      .map(key => matches.find(m => m.key === key)!);

  return uniqueMatches;
};