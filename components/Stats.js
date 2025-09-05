export default function Stats() {
  const stats = [
    { value: '50K+', label: 'Active Readers' },
    { value: '1.2K', label: 'Articles Published' },
    { value: '200+', label: 'Expert Writers' },
    { value: '15', label: 'Categories' },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
      {stats.map((stat, index) => (
        <div key={index} className="glass-card rounded-2xl p-6 text-center shadow-soft">
          <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
          <div className="text-gray-600 font-medium">{stat.label}</div>
        </div>
      ))}
    </section>
  );
}