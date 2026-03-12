clear all
stations = {'ATS','ATK','CNA','DHM','MSK','ZYT','BSI'};
colors = {'b','r','g','m','c','k',[0.85 0.33 0.10]};
xsi = 0.05;
Tn = logspace(-2,2,41);
SD_all = zeros(length(stations), length(Tn));
SV_all = zeros(length(stations), length(Tn));
SA_all = zeros(length(stations), length(Tn));
for s = 1:length(stations)
    load(stations{s})
    inputmotion = acc;
    for n = 1:length(Tn)
        hdur = 5*Tn(n);
        t = (0:dt:hdur);
        omegan = 2*pi/Tn(n);
        omegad = omegan * sqrt(1 - xsi * xsi);
        A = 1/omegad;
        h = A * exp(-xsi * omegan * t) .* sin(omegad * t);
        ur = conv(inputmotion,h) * dt;
        ur = ur(1:ndat);
        SD_all(s,n) = max(abs(ur));
        hv = exp(-xsi * omegan * t) .* cos(omegad * t);
        vr = conv(inputmotion, hv) * dt;
        vr = vr(1:ndat) - xsi * omegan * ur;
        SV_all(s,n) = max(abs(vr));
        at = -2 * xsi * omegan * vr - omegan^2 * ur;
        SA_all(s,n) = max(abs(at));
    end
end
figure
for s = 1:length(stations)
    loglog(Tn, SD_all(s,:), 'Color', colors{s}, 'LineWidth', 1.5), hold on
end
xlabel('Period [s]'), ylabel('SD [cm]'), grid
title('Spectral Displacement (SD)')
legend(stations, 'Location', 'northwest')

figure
for s = 1:length(stations)
    loglog(Tn, SV_all(s,:), 'Color', colors{s}, 'LineWidth', 1.5), hold on
end
xlabel('Period [s]'), ylabel('SV [cm/s]'), grid
title('Spectral Velocity (SV)')
legend(stations, 'Location', 'northwest')

figure
for s = 1:length(stations)
    loglog(Tn, SA_all(s,:), 'Color', colors{s}, 'LineWidth', 1.5), hold on
end
xlabel('Period [s]'), ylabel('SA [cm/s^2]'), grid
title('Spectral Acceleration (SA)')
legend(stations, 'Location', 'northeast')
